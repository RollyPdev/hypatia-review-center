"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarIcon,
  CheckCircle,
  ChevronDown,
  GraduationCap,
  Loader2,
  MapPinned,
  Search,
  ShieldCheck,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ProgramOption = {
  id: string;
  title: string;
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

type SchoolOption = {
  address: string;
  name: string;
  type: string;
};

type SelectOption = {
  code: string;
  disabled?: boolean;
  meta?: string;
  name: string;
};

type EnrollmentModalProps = {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  programs: ProgramOption[];
};

type EnrollmentForm = {
  addressLine: string;
  barangay: string;
  barangayCode: string;
  birthdate: string;
  birthplace: string;
  city: string;
  cityCode: string;
  contactNumber: string;
  firstName: string;
  guardianAddress: string;
  guardianContactNumber: string;
  guardianFirstName: string;
  guardianLastName: string;
  guardianMiddleInitial: string;
  guardianRelationship: string;
  lastName: string;
  middleInitial: string;
  program: string;
  province: string;
  provinceCode: string;
  region: string;
  regionCode: string;
  schoolAddress: string;
  schoolName: string;
  sex: string;
  zipCode: string;
};

const INITIAL_FORM: EnrollmentForm = {
  addressLine: "",
  barangay: "",
  barangayCode: "",
  birthdate: "",
  birthplace: "",
  city: "",
  cityCode: "",
  contactNumber: "",
  firstName: "",
  guardianAddress: "",
  guardianContactNumber: "",
  guardianFirstName: "",
  guardianLastName: "",
  guardianMiddleInitial: "",
  guardianRelationship: "",
  lastName: "",
  middleInitial: "",
  program: "",
  province: "",
  provinceCode: "",
  region: "",
  regionCode: "",
  schoolAddress: "",
  schoolName: "",
  sex: "",
  zipCode: "",
};

const NCR_REGION_CODE = "1300000000";
const NCR_PROVINCE: AddressOption = {
  code: "NCR-METRO-MANILA",
  name: "Metro Manila / NCR",
  region: "National Capital Region (NCR)",
};

const SEX_OPTIONS: SelectOption[] = [
  { code: "Female", name: "Female" },
  { code: "Male", name: "Male" },
  { code: "Prefer not to say", name: "Prefer not to say" },
];

const RELATIONSHIP_OPTIONS: SelectOption[] = [
  { code: "Parent", name: "Parent" },
  { code: "Guardian", name: "Guardian" },
  { code: "Spouse", name: "Spouse" },
  { code: "Sibling", name: "Sibling" },
  { code: "Relative", name: "Relative" },
];

const SECTION_PANEL_CLASS =
  "flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70 sm:gap-6 sm:p-6";

const FIELD_GRID_CLASS = "grid gap-4 sm:gap-5";
const BIRTHDAY_START_MONTH = new Date(1920, 0, 1);
const SCHOOL_SEARCH_DEBOUNCE_MS = 350;

function calculateAge(birthdate: string) {
  if (!birthdate) {
    return "";
  }

  const birthday = new Date(`${birthdate}T00:00:00`);

  if (Number.isNaN(birthday.getTime())) {
    return "";
  }

  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const monthDifference = today.getMonth() - birthday.getMonth();
  const hasBirthdayPassed =
    monthDifference > 0 ||
    (monthDifference === 0 && today.getDate() >= birthday.getDate());

  if (!hasBirthdayPassed) {
    age -= 1;
  }

  return age >= 0 ? String(age) : "";
}

function parseDateInput(value: string) {
  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return undefined;
  }

  const date = new Date(year, month - 1, day);

  return Number.isNaN(date.getTime()) ? undefined : date;
}

function formatDateInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDisplayDate(date: Date) {
  return new Intl.DateTimeFormat("en-PH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

async function getItems<T>(url: string, init?: RequestInit) {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new Error("Unable to load form options.");
  }

  const data = (await response.json()) as { items?: T[] };

  return data.items ?? [];
}

function addressMeta(option: AddressOption) {
  return [option.type, option.province, option.region, option.zipCode && `ZIP ${option.zipCode}`]
    .filter(Boolean)
    .join(" / ");
}

function mapAddressOptions(options: AddressOption[]): SelectOption[] {
  return options.map((option) => ({
    code: option.code,
    meta: addressMeta(option),
    name: option.name,
  }));
}

export function EnrollmentModal({ onOpenChange, open, programs }: EnrollmentModalProps) {
  const [form, setForm] = useState<EnrollmentForm>(INITIAL_FORM);
  const [regions, setRegions] = useState<AddressOption[]>([]);
  const [provinces, setProvinces] = useState<AddressOption[]>([]);
  const [cities, setCities] = useState<AddressOption[]>([]);
  const [barangays, setBarangays] = useState<AddressOption[]>([]);
  const [schools, setSchools] = useState<SchoolOption[]>([]);
  const [schoolSearch, setSchoolSearch] = useState("");
  const [loadingField, setLoadingField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const age = useMemo(() => calculateAge(form.birthdate), [form.birthdate]);
  const selectedCity = cities.find((city) => city.code === form.cityCode);

  const updateForm = (updates: Partial<EnrollmentForm>) => {
    setForm((current) => ({ ...current, ...updates }));
  };

  const loadAddressOptions = async (url: string, field: string) => {
    setLoadingField(field);

    try {
      return await getItems<AddressOption>(url);
    } catch {
      return [];
    } finally {
      setLoadingField((current) => (current === field ? null : current));
    }
  };

  useEffect(() => {
    if (!open || regions.length > 0) {
      return;
    }

    let canceled = false;

    const loadRegions = async () => {
      const nextRegions = await loadAddressOptions("/api/address?resource=regions", "regions");

      if (!canceled) {
        setRegions(nextRegions);
      }
    };

    void loadRegions();

    return () => {
      canceled = true;
    };
  }, [open, regions.length]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const controller = new AbortController();
    let canceled = false;

    const timeout = window.setTimeout(async () => {
      const query = schoolSearch.trim();
      const url = query
        ? `/api/schools?q=${encodeURIComponent(query)}`
        : "/api/schools";

      setLoadingField("schools");

      try {
        const nextSchools = await getItems<SchoolOption>(url, {
          signal: controller.signal,
        });

        if (!canceled) {
          setSchools(nextSchools);
        }
      } catch {
        if (!canceled) {
          setSchools([]);
        }
      } finally {
        if (!canceled) {
          setLoadingField((current) => (current === "schools" ? null : current));
        }
      }
    }, SCHOOL_SEARCH_DEBOUNCE_MS);

    return () => {
      canceled = true;
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [open, schoolSearch]);

  const handleRegionSelect = async (regionCode: string) => {
    const region = regions.find((item) => item.code === regionCode);

    if (!region) {
      return;
    }

    updateForm({
      barangay: "",
      barangayCode: "",
      city: "",
      cityCode: "",
      province: "",
      provinceCode: "",
      region: region.name,
      regionCode: region.code,
      zipCode: "",
    });
    setBarangays([]);
    setCities([]);
    setProvinces([]);

    const nextProvinces = await loadAddressOptions(
      `/api/address?resource=provinces&region=${encodeURIComponent(region.code)}`,
      "provinces",
    );

    if (region.code === NCR_REGION_CODE || nextProvinces.length === 0) {
      setProvinces([NCR_PROVINCE]);
      updateForm({
        province: NCR_PROVINCE.name,
        provinceCode: NCR_PROVINCE.code,
      });

      const nextCities = await loadAddressOptions(
        `/api/address?resource=cities&region=${encodeURIComponent(region.code)}`,
        "cities",
      );
      setCities(nextCities);
      return;
    }

    setProvinces(nextProvinces);
  };

  const handleProvinceSelect = async (provinceCode: string) => {
    const province = provinces.find((item) => item.code === provinceCode);

    if (!province) {
      return;
    }

    updateForm({
      barangay: "",
      barangayCode: "",
      city: "",
      cityCode: "",
      province: province.name,
      provinceCode: province.code,
      zipCode: "",
    });
    setBarangays([]);
    setCities([]);

    const nextCities = await loadAddressOptions(
      province.code === NCR_PROVINCE.code
        ? `/api/address?resource=cities&region=${encodeURIComponent(form.regionCode)}`
        : `/api/address?resource=cities&province=${encodeURIComponent(province.code)}`,
      "cities",
    );
    setCities(nextCities);
  };

  const handleCitySelect = async (cityCode: string) => {
    const city = cities.find((item) => item.code === cityCode);

    if (!city) {
      return;
    }

    updateForm({
      barangay: "",
      barangayCode: "",
      city: city.name,
      cityCode: city.code,
      zipCode: city.zipCode ?? "",
    });
    setBarangays([]);

    const nextBarangays = await loadAddressOptions(
      `/api/address?resource=barangays&city=${encodeURIComponent(city.code)}`,
      "barangays",
    );
    setBarangays(nextBarangays);
  };

  const handleBarangaySelect = (barangayCode: string) => {
    const barangay = barangays.find((item) => item.code === barangayCode);

    if (!barangay) {
      return;
    }

    updateForm({
      barangay: barangay.name,
      barangayCode: barangay.code,
      zipCode: barangay.zipCode || selectedCity?.zipCode || form.zipCode,
    });
  };

  const handleSchoolSelect = (schoolName: string) => {
    setSchoolSearch(schoolName);
    updateForm({
      schoolName,
    });
  };

  const handleSchoolSearchChange = (schoolName: string) => {
    setLoadingField("schools");
    setSchoolSearch(schoolName);
    updateForm({ schoolName });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleClose = (nextOpen: boolean) => {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      setLoadingField(null);
      setSubmitted(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        initialFocus={false}
        className="flex max-h-[94vh] w-[calc(100%-1rem)] overflow-hidden rounded-xl border border-emerald-950/10 bg-slate-50 p-0 shadow-2xl shadow-emerald-950/25 sm:max-w-6xl [&_[data-slot=dialog-close]]:text-white [&_[data-slot=dialog-close]]:hover:bg-white/10"
      >
        <div className="flex max-h-[94vh] min-h-0 w-full flex-col overflow-hidden">
          <DialogHeader className="relative overflow-hidden border-b border-emerald-900/25 bg-emerald-950 px-5 py-6 text-white sm:px-7 sm:py-7">
            <div
              className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.13),transparent_36%,rgba(16,185,129,0.18))]"
              aria-hidden="true"
            />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-white text-emerald-950">Enrollment</Badge>
                  <Badge className="border-white/20 bg-white/10 text-white">
                    New applicant
                  </Badge>
                </div>
                <DialogTitle className="mt-4 font-sans text-2xl font-black text-white sm:text-3xl">
                  Hypatia Enrollment Form
                </DialogTitle>
                <DialogDescription className="mt-3 max-w-xl text-sm leading-6 text-emerald-100">
                  Complete the applicant, address, school, and guardian details for
                  admissions review.
                </DialogDescription>
              </div>

              <div className="hidden gap-3 rounded-xl border border-white/15 bg-white/10 p-3 text-xs font-bold text-emerald-50 sm:grid sm:grid-cols-3 lg:min-w-[390px]">
                {[
                  { icon: ShieldCheck, label: "Applicant", meta: "Identity" },
                  { icon: GraduationCap, label: "Program", meta: "Track" },
                  { icon: UsersRound, label: "Guardian", meta: "Contact" },
                ].map(({ icon: Icon, label, meta }, index) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2"
                  >
                    <Icon className="size-4 shrink-0 text-emerald-200" aria-hidden="true" />
                    <span>
                      <span className="block text-[10px] uppercase text-emerald-200">
                        Step {index + 1}
                      </span>
                      <span className="mt-0.5 block text-white">{label}</span>
                      <span className="block text-[10px] text-emerald-100/80">{meta}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </DialogHeader>

          {submitted ? (
            <div className="flex flex-col items-center bg-white px-6 py-14 text-center sm:py-16">
              <div className="flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <CheckCircle aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-2xl font-black text-emerald-950">
                Enrollment details received.
              </h3>
              <p className="mt-3 max-w-md leading-7 text-slate-600">
                An admissions officer will review the form and contact the applicant
                using the provided contact number.
              </p>
              <Button
                type="button"
                className="mt-8 h-11 bg-emerald-700 px-5 font-bold text-white hover:bg-emerald-800"
                onClick={() => {
                  setForm(INITIAL_FORM);
                  setSubmitted(false);
                }}
              >
                Submit Another Form
              </Button>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
            <div
              role="region"
              aria-label="Enrollment form sections"
              tabIndex={0}
              className="min-h-0 flex-1 overflow-y-auto bg-slate-50 px-4 py-5 sm:px-6 sm:py-6"
            >
              <FieldGroup className="gap-5 sm:gap-6">
                <section className={SECTION_PANEL_CLASS}>
                  <SectionTitle
                    description="Applicant legal name, birth details, and primary contact."
                    icon={UserRound}
                    step="01"
                    title="Personal Information"
                  />
                  <div className={cn(FIELD_GRID_CLASS, "md:grid-cols-3")}>
                    <TextField
                      id="lastName"
                      label="Last Name"
                      required
                      value={form.lastName}
                      onChange={(value) => updateForm({ lastName: value })}
                    />
                    <TextField
                      id="firstName"
                      label="First Name"
                      required
                      value={form.firstName}
                      onChange={(value) => updateForm({ firstName: value })}
                    />
                    <TextField
                      id="middleInitial"
                      label="Middle I."
                      maxLength={3}
                      value={form.middleInitial}
                      onChange={(value) => updateForm({ middleInitial: value.toUpperCase() })}
                    />
                  </div>

                  <div className={cn(FIELD_GRID_CLASS, "md:grid-cols-4")}>
                    <TextField
                      id="birthplace"
                      label="Birthplace"
                      required
                      value={form.birthplace}
                      onChange={(value) => updateForm({ birthplace: value })}
                    />
                    <BirthdayDatePicker
                      value={form.birthdate}
                      onChange={(value) => updateForm({ birthdate: value })}
                    />
                    <TextField id="age" label="Age" readOnly value={age} />
                    <SearchableSelect
                      label="Sex"
                      options={SEX_OPTIONS}
                      placeholder="Select sex"
                      required
                      value={form.sex}
                      onSelect={(value) => updateForm({ sex: value })}
                    />
                  </div>

                  <div className={cn(FIELD_GRID_CLASS, "md:grid-cols-[minmax(0,1fr)_2fr]")}>
                    <TextField
                      id="contactNumber"
                      label="Contact Number"
                      placeholder="+63 917 000 0000"
                      required
                      type="tel"
                      value={form.contactNumber}
                      onChange={(value) => updateForm({ contactNumber: value })}
                    />
                    <SearchableSelect
                      label="Program"
                      options={programs.map((program) => ({
                        code: program.id,
                        name: program.title,
                      }))}
                      placeholder="Select review track"
                      required
                      value={form.program}
                      onSelect={(value) => updateForm({ program: value })}
                    />
                  </div>
                </section>

                <section className={SECTION_PANEL_CLASS}>
                  <SectionTitle
                    description="Cascading searchable address fields powered by PSGC reference data."
                    icon={MapPinned}
                    step="02"
                    title="Address"
                  />
                  <TextField
                    id="addressLine"
                    label="House / Street / Unit"
                    placeholder="Street, building, subdivision"
                    value={form.addressLine}
                    onChange={(value) => updateForm({ addressLine: value })}
                  />
                  <div className={cn(FIELD_GRID_CLASS, "md:grid-cols-2")}>
                    <SearchableSelect
                      label="Region"
                      loading={loadingField === "regions"}
                      options={mapAddressOptions(regions)}
                      placeholder="Search region"
                      required
                      value={form.regionCode}
                      onSelect={handleRegionSelect}
                    />
                    <SearchableSelect
                      disabled={!form.regionCode || loadingField === "provinces"}
                      label="Province"
                      loading={loadingField === "provinces"}
                      options={mapAddressOptions(provinces)}
                      placeholder="Search province"
                      required
                      value={form.provinceCode}
                      onSelect={handleProvinceSelect}
                    />
                    <SearchableSelect
                      disabled={!form.provinceCode || loadingField === "cities"}
                      label="City/Municipality"
                      loading={loadingField === "cities"}
                      options={mapAddressOptions(cities)}
                      placeholder="Search city or municipality"
                      required
                      value={form.cityCode}
                      onSelect={handleCitySelect}
                    />
                    <SearchableSelect
                      disabled={!form.cityCode || loadingField === "barangays"}
                      label="Barangay"
                      loading={loadingField === "barangays"}
                      options={mapAddressOptions(barangays)}
                      placeholder="Search barangay"
                      required
                      value={form.barangayCode}
                      onSelect={handleBarangaySelect}
                    />
                  </div>
                  <TextField
                    id="zipCode"
                    label="Zip Code"
                    placeholder="Automatic"
                    readOnly
                    value={form.zipCode}
                  />
                </section>

                <section className={SECTION_PANEL_CLASS}>
                  <SectionTitle
                    description="Search Philippine higher education institutions, then enter the school address manually."
                    icon={BookOpenCheck}
                    step="03"
                    title="School Graduated"
                  />
                  <SearchableSelect
                    allowCustom
                    label="Name of School"
                    loading={loadingField === "schools"}
                    loadingText={
                      schoolSearch.trim()
                        ? "Searching schools..."
                        : "Loading schools..."
                    }
                    options={schools.map((school) => ({
                      code: school.name,
                      meta: school.type,
                      name: school.name,
                    }))}
                    placeholder="Search school"
                    required
                    value={form.schoolName}
                    onSearchChange={handleSchoolSearchChange}
                    onSelect={handleSchoolSelect}
                  />
                  <TextField
                    id="schoolAddress"
                    label="Address of School"
                    placeholder="School address"
                    value={form.schoolAddress}
                    onChange={(value) => updateForm({ schoolAddress: value })}
                  />
                </section>

                <section className={SECTION_PANEL_CLASS}>
                  <SectionTitle
                    description="Parent or guardian contact details for admissions coordination."
                    icon={UsersRound}
                    step="04"
                    title="Guardian's Informations"
                  />
                  <div className={cn(FIELD_GRID_CLASS, "md:grid-cols-3")}>
                    <TextField
                      id="guardianLastName"
                      label="Last Name"
                      required
                      value={form.guardianLastName}
                      onChange={(value) => updateForm({ guardianLastName: value })}
                    />
                    <TextField
                      id="guardianFirstName"
                      label="First Name"
                      required
                      value={form.guardianFirstName}
                      onChange={(value) => updateForm({ guardianFirstName: value })}
                    />
                    <TextField
                      id="guardianMiddleInitial"
                      label="Middle I."
                      maxLength={3}
                      value={form.guardianMiddleInitial}
                      onChange={(value) =>
                        updateForm({ guardianMiddleInitial: value.toUpperCase() })
                      }
                    />
                  </div>
                  <div className={cn(FIELD_GRID_CLASS, "md:grid-cols-2")}>
                    <SearchableSelect
                      label="Relationship"
                      options={RELATIONSHIP_OPTIONS}
                      placeholder="Select relationship"
                      required
                      value={form.guardianRelationship}
                      onSelect={(value) => updateForm({ guardianRelationship: value })}
                    />
                    <TextField
                      id="guardianContactNumber"
                      label="Contact Number"
                      placeholder="+63 917 000 0000"
                      required
                      type="tel"
                      value={form.guardianContactNumber}
                      onChange={(value) => updateForm({ guardianContactNumber: value })}
                    />
                  </div>
                  <TextField
                    id="guardianAddress"
                    label="Address"
                    placeholder="Complete guardian address"
                    value={form.guardianAddress}
                    onChange={(value) => updateForm({ guardianAddress: value })}
                  />
                </section>
              </FieldGroup>
            </div>

            <DialogFooter className="mx-0 mb-0 shrink-0 gap-3 rounded-none border-t border-slate-200 bg-white/95 px-4 py-4 shadow-[0_-16px_32px_rgba(15,23,42,0.08)] sm:flex-row sm:px-6">
              <Button
                type="button"
                variant="outline"
                className="h-11 w-full px-5 font-bold text-slate-700 sm:w-auto"
                onClick={() => handleClose(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-11 w-full bg-emerald-700 px-5 font-bold text-white shadow-lg shadow-emerald-900/15 hover:bg-emerald-800 sm:w-auto"
              >
                Submit Enrollment
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Button>
            </DialogFooter>
          </form>
        )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SectionTitle({
  description,
  icon: Icon,
  step,
  title,
}: {
  description: string;
  icon: LucideIcon;
  step: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-start sm:gap-4">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100">
        <Icon aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100">
            Step {step}
          </Badge>
          <span className="text-xs font-bold uppercase text-slate-400">
            Admissions record
          </span>
        </div>
        <div className="mt-2 font-sans text-lg font-black text-emerald-950">
          {title}
        </div>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function BirthdayDatePicker({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
}) {
  const [open, setOpen] = useState(false);
  const selectedDate = useMemo(() => parseDateInput(value), [value]);
  const today = useMemo(() => new Date(), []);

  return (
    <Field className="gap-2">
      <FieldLabel
        htmlFor="birthdate"
        className="text-xs font-black uppercase tracking-[0.08em] text-slate-500"
      >
        Birthday
      </FieldLabel>
      <div className="flex flex-col gap-2">
        <Button
          id="birthdate"
          type="button"
          variant="outline"
          aria-controls="birthdate-calendar"
          aria-expanded={open}
          aria-required="true"
          className={cn(
            "h-11 w-full justify-start rounded-lg border-slate-200 bg-slate-50 px-3 text-left font-semibold text-slate-900 shadow-sm shadow-slate-200/50 transition hover:bg-white focus-visible:border-emerald-700 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-emerald-700/10",
            !selectedDate && "text-slate-500"
          )}
          onClick={() => setOpen((current) => !current)}
        >
          <CalendarIcon data-icon="inline-start" aria-hidden="true" />
          <span className="truncate">
            {selectedDate ? formatDisplayDate(selectedDate) : "Select birthday"}
          </span>
        </Button>
        {open && (
          <div
            id="birthdate-calendar"
            className="w-fit rounded-xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-950/10"
          >
            <Calendar
              mode="single"
              selected={selectedDate}
              defaultMonth={selectedDate ?? new Date(2000, 0)}
              startMonth={BIRTHDAY_START_MONTH}
              endMonth={today}
              disabled={{ after: today }}
              captionLayout="dropdown"
              buttonVariant="ghost"
              className="rounded-xl [--cell-size:--spacing(9)]"
              onSelect={(date) => {
                if (!date) {
                  return;
                }

                onChange(formatDateInput(date));
                setOpen(false);
              }}
            />
            <div className="border-t border-slate-100 px-3 py-2 text-xs font-medium text-slate-500">
              Choose the birth month, year, and day.
            </div>
          </div>
        )}
      </div>
    </Field>
  );
}

function TextField({
  className,
  id,
  label,
  onChange,
  value,
  ...props
}: {
  id: string;
  label: string;
  onChange?: (value: string) => void;
  value: string;
} & Omit<ComponentProps<typeof Input>, "onChange" | "value">) {
  return (
    <Field className="gap-2">
      <FieldLabel
        htmlFor={id}
        className="text-xs font-black uppercase tracking-[0.08em] text-slate-500"
      >
        {label}
      </FieldLabel>
      <Input
        id={id}
        className={cn(
          "h-11 rounded-lg border-slate-200 bg-slate-50 px-3 font-semibold text-slate-900 shadow-sm shadow-slate-200/50 transition focus-visible:border-emerald-700 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-emerald-700/10 read-only:bg-slate-100 read-only:text-slate-600",
          className,
        )}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        {...props}
      />
    </Field>
  );
}

function SearchableSelect({
  allowCustom = false,
  disabled = false,
  label,
  loading = false,
  loadingText = "Loading options...",
  onCustomValue,
  onSearchChange,
  onSelect,
  options,
  placeholder,
  required = false,
  value,
}: {
  allowCustom?: boolean;
  disabled?: boolean;
  label: string;
  loading?: boolean;
  loadingText?: string;
  onCustomValue?: (value: string) => void;
  onSearchChange?: (value: string) => void;
  onSelect: (value: string) => void | Promise<void>;
  options: SelectOption[];
  placeholder: string;
  required?: boolean;
  value: string;
}) {
  const selectedOption = options.find((option) => option.code === value);
  const selectedLabel = selectedOption?.name ?? value;
  const [query, setQuery] = useState(selectedLabel);
  const [open, setOpen] = useState(false);
  const inputValue = open ? query : selectedLabel;

  const visibleOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (
      !normalizedQuery ||
      (selectedOption && normalizedQuery === selectedLabel.toLowerCase())
    ) {
      return options.slice(0, 24);
    }

    return options
      .filter((option) =>
        `${option.name} ${option.meta ?? ""}`.toLowerCase().includes(normalizedQuery),
      )
      .slice(0, 24);
  }, [options, query, selectedLabel, selectedOption]);

  const trailingIcon: ReactNode = loading ? (
    <Loader2 className="size-4 animate-spin text-slate-400" aria-hidden="true" />
  ) : (
    <ChevronDown className="size-4 text-slate-400" aria-hidden="true" />
  );

  return (
    <Field className="gap-2" data-disabled={disabled}>
      <FieldLabel className="text-xs font-black uppercase tracking-[0.08em] text-slate-500">
        {label}
      </FieldLabel>
      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Search className="size-4" aria-hidden="true" />
        </div>
        <Input
          aria-expanded={open}
          aria-haspopup="listbox"
          autoComplete="off"
          className="h-11 rounded-lg border-slate-200 bg-slate-50 pl-9 pr-10 font-semibold text-slate-900 shadow-sm shadow-slate-200/50 transition focus-visible:border-emerald-700 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-emerald-700/10"
          disabled={disabled}
          placeholder={loading ? "Loading..." : placeholder}
          required={required}
          role="combobox"
          value={inputValue}
          onBlur={() => setOpen(false)}
          onChange={(event) => {
            const nextQuery = event.target.value;

            setQuery(nextQuery);
            setOpen(true);
            onSearchChange?.(nextQuery);
            onCustomValue?.(nextQuery);
          }}
          onFocus={() => {
            setQuery(selectedLabel);
            setOpen(true);
          }}
        />
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          {trailingIcon}
        </div>

        {open && !disabled && (
          <div
            className="absolute left-0 right-0 top-[calc(100%+0.35rem)] z-30 max-h-64 overflow-y-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/12 ring-1 ring-slate-900/5"
            role="listbox"
          >
            {loading && (
              <div className="flex items-center gap-2 px-3 py-3 text-sm font-semibold text-slate-500">
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                <span>{loadingText}</span>
              </div>
            )}
            {visibleOptions.length > 0 ? (
              visibleOptions.map((option) => (
                <button
                  key={option.code}
                  className={cn(
                    "flex w-full flex-col rounded-md px-3 py-2.5 text-left text-sm transition hover:bg-emerald-50 hover:text-emerald-950",
                    option.code === value &&
                      "bg-emerald-50 text-emerald-950 ring-1 ring-emerald-100",
                  )}
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    setQuery(option.name);
                    setOpen(false);
                    void onSelect(option.code);
                  }}
                >
                  <span className="font-bold">{option.name}</span>
                  {option.meta && (
                    <span className="mt-0.5 text-xs text-slate-500">{option.meta}</span>
                  )}
                </button>
              ))
            ) : !loading ? (
              <div className="px-3 py-3 text-sm text-slate-500">
                {allowCustom ? "No match found. The typed value will be used." : "No options found."}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </Field>
  );
}
