type SchoolOption = {
  address: string;
  category: string;
  name: string;
  type: string;
};

type ExternalSchool = {
  address?: unknown;
  category?: unknown;
  city?: unknown;
  location?: unknown;
  name?: unknown;
  province?: unknown;
  school?: unknown;
  school_name?: unknown;
  type?: unknown;
};

const PH_HIGHER_EDUCATION_API_BASE =
  "https://philippines-higher-education.onrender.com";
const PH_HIGHER_EDUCATION_ALL_SCHOOLS_ENDPOINT = "/api/schools";
const CACHE_TTL_SECONDS = 60 * 60 * 24;

const FALLBACK_SCHOOLS: SchoolOption[] = [
  {
    address: "Diliman, Quezon City",
    category: "SUC",
    name: "University of the Philippines Diliman",
    type: "SUC",
  },
  {
    address: "Sta. Mesa, Manila",
    category: "SUC",
    name: "Polytechnic University of the Philippines",
    type: "SUC",
  },
  {
    address: "Taft Avenue, Manila",
    category: "SUC",
    name: "Philippine Normal University",
    type: "SUC",
  },
  {
    address: "Ayala Boulevard, Manila",
    category: "SUC",
    name: "Technological University of the Philippines",
    type: "SUC",
  },
  {
    address: "España Boulevard, Manila",
    category: "HEI",
    name: "University of Santo Tomas",
    type: "Private HEI",
  },
  {
    address: "Loyola Heights, Quezon City",
    category: "HEI",
    name: "Ateneo de Manila University",
    type: "Private HEI",
  },
  {
    address: "Taft Avenue, Manila",
    category: "HEI",
    name: "De La Salle University",
    type: "Private HEI",
  },
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeSchool(school: ExternalSchool, region: string): SchoolOption | null {
  const name =
    normalizeText(school.name) ||
    normalizeText(school.school_name) ||
    normalizeText(school.school);

  if (!name) {
    return null;
  }

  const type = normalizeText(school.type) || "Higher Education Institution";
  const category = normalizeText(school.category) || type;
  const address =
    [
      normalizeText(school.address) || normalizeText(school.location),
      normalizeText(school.city),
      normalizeText(school.province),
    ]
      .filter(Boolean)
      .join(", ") || region || "Philippines";

  return {
    address,
    category,
    name,
    type,
  };
}

function normalizeSchoolList(schools: unknown[], region: string) {
  return schools
    .map((school) => normalizeSchool(school as ExternalSchool, region))
    .filter((school): school is SchoolOption => Boolean(school));
}

function normalizeRegionGroup(group: unknown) {
  if (!isRecord(group)) {
    return [];
  }

  const region = normalizeText(group.region);

  if (Array.isArray(group.schools)) {
    return normalizeSchoolList(group.schools, region);
  }

  const school = normalizeSchool(group as ExternalSchool, region);

  return school ? [school] : [];
}

function normalizeRegionsMap(regions: Record<string, unknown>) {
  return Object.entries(regions).flatMap(([region, value]) => {
    if (Array.isArray(value)) {
      return normalizeSchoolList(value, region);
    }

    if (isRecord(value) && Array.isArray(value.schools)) {
      return normalizeSchoolList(value.schools, region);
    }

    return [];
  });
}

function normalizeSchoolsPayload(payload: unknown) {
  if (Array.isArray(payload)) {
    return payload.flatMap(normalizeRegionGroup);
  }

  if (!isRecord(payload)) {
    return [];
  }

  if (isRecord(payload.regions)) {
    return normalizeRegionsMap(payload.regions);
  }

  for (const key of ["items", "data", "schools"] as const) {
    if (Array.isArray(payload[key])) {
      return normalizeSchoolsPayload(payload[key]);
    }
  }

  return [];
}

function dedupeSchools(schools: SchoolOption[]) {
  const seen = new Set<string>();

  return schools
    .filter((school) => {
      const key = `${school.name}|${school.address}`.toLowerCase();

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

function filterSchools(schools: SchoolOption[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return schools;
  }

  return schools.filter((school) =>
    `${school.name} ${school.address} ${school.type} ${school.category}`
      .toLowerCase()
      .includes(normalizedQuery),
  );
}

async function fetchRemoteSchools() {
  const response = await fetch(
    `${PH_HIGHER_EDUCATION_API_BASE}${PH_HIGHER_EDUCATION_ALL_SCHOOLS_ENDPOINT}`,
    {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: CACHE_TTL_SECONDS },
    },
  );

  if (!response.ok) {
    return [];
  }

  return dedupeSchools(normalizeSchoolsPayload(await response.json()));
}

async function fetchFallbackRemoteSchools() {
  const endpoints = ["/api/schools/heis", "/api/schools/sucs"];
  const payloads = await Promise.all(
    endpoints.map(async (endpoint) => {
      const response = await fetch(`${PH_HIGHER_EDUCATION_API_BASE}${endpoint}`, {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: CACHE_TTL_SECONDS },
      });

      return response.ok ? response.json() : [];
    }),
  );

  return dedupeSchools(payloads.flatMap(normalizeSchoolsPayload));
}

async function fetchRemoteSchoolCollection() {
  try {
    const allSchools = await fetchRemoteSchools();

    if (allSchools.length > 0) {
      return {
        schools: allSchools,
        source: "philippines-higher-education-all-schools",
      };
    }
  } catch {
    // Try the category endpoints before falling back to the small local list.
  }

  const filteredSchools = await fetchFallbackRemoteSchools();

  return {
    schools: filteredSchools,
    source: "philippines-higher-education-filtered-schools",
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";

  try {
    const remoteCollection = await fetchRemoteSchoolCollection();
    const schools =
      remoteCollection.schools.length > 0
        ? remoteCollection.schools
        : FALLBACK_SCHOOLS;

    return Response.json({
      items: filterSchools(schools, query),
      source:
        remoteCollection.schools.length > 0 ? remoteCollection.source : "fallback",
      total: schools.length,
    });
  } catch {
    return Response.json({
      items: filterSchools(FALLBACK_SCHOOLS, query),
      source: "fallback",
      total: FALLBACK_SCHOOLS.length,
    });
  }
}
