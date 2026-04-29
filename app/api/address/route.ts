type PsgcItem = {
  city_municipality?: string;
  code: string;
  district?: string;
  name: string;
  province?: string;
  region?: string;
  status?: string;
  type?: string;
  zip_code?: string;
};

type AddressOption = {
  code: string;
  district?: string;
  name: string;
  province?: string;
  region?: string;
  type?: string;
  zipCode?: string;
};

const PSGC_BASE_URL = "https://psgc.cloud/api/v2";
const CACHE_TTL_SECONDS = 60 * 60 * 24 * 7;
const CITY_TYPES = new Set(["City", "Mun", "Municipality"]);

function cleanName(value: string) {
  return value.replaceAll("Ã±", "ñ").trim();
}

function normalizeAddressOption(item: PsgcItem): AddressOption {
  return {
    code: item.code,
    district: item.district,
    name: cleanName(item.name),
    province: item.province,
    region: item.region,
    type: item.type,
    zipCode: item.zip_code,
  };
}

function normalizePayload(payload: unknown) {
  if (Array.isArray(payload)) {
    return payload as PsgcItem[];
  }

  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    Array.isArray(payload.data)
  ) {
    return payload.data as PsgcItem[];
  }

  return [];
}

async function fetchPsgc(path: string) {
  const response = await fetch(`${PSGC_BASE_URL}${path}`, {
    next: { revalidate: CACHE_TTL_SECONDS },
  });

  if (!response.ok) {
    return [];
  }

  return normalizePayload(await response.json());
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const resource = searchParams.get("resource");
  const region = searchParams.get("region");
  const province = searchParams.get("province");
  const city = searchParams.get("city");

  try {
    if (resource === "regions") {
      const regions = await fetchPsgc("/regions");

      return Response.json({
        items: regions.map(normalizeAddressOption),
      });
    }

    if (resource === "provinces" && region) {
      const provinces = await fetchPsgc(
        `/regions/${encodeURIComponent(region)}/provinces`,
      );

      return Response.json({
        items: provinces.map(normalizeAddressOption),
      });
    }

    if (resource === "cities" && (province || region)) {
      const path = province
        ? `/provinces/${encodeURIComponent(province)}/cities-municipalities`
        : `/regions/${encodeURIComponent(region ?? "")}/cities-municipalities`;
      const localities = await fetchPsgc(path);

      return Response.json({
        items: localities
          .filter((item) => CITY_TYPES.has(item.type ?? ""))
          .map(normalizeAddressOption),
      });
    }

    if (resource === "barangays" && city) {
      const barangays = await fetchPsgc(
        `/cities-municipalities/${encodeURIComponent(city)}/barangays`,
      );

      return Response.json({
        items: barangays.map((item) => ({
          ...normalizeAddressOption(item),
          zipCode: item.zip_code,
        })),
      });
    }

    return Response.json({ items: [] });
  } catch {
    return Response.json({ items: [] }, { status: 502 });
  }
}
