"use client";

import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicantSchema, type ApplicantInput } from "@/lib/validation";
import { useRef } from "react";

const stateOptions = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

const endorsementOptions = [
  { value: "T", label: "T — Doubles/Triples (FedEx Ground)" },
  { value: "H", label: "H — Hazmat" },
  { value: "X", label: "X — Tank + Hazmat" },
];

type DriverApplicationFormProps = {
  defaultPosition?: string;
  isTeam?: boolean;
};

export function DriverApplicationForm({ defaultPosition = "CDL-A Driver", isTeam = false }: DriverApplicationFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  const dobMax = useMemo(() => {
    const today = new Date();
    return formatDateInput(new Date(today.getFullYear() - 21, today.getMonth(), today.getDate()));
  }, []);

  const defaultValues = useMemo<ApplicantInput>(() => ({
    personalInfo: {
      fullName: "",
      dob: "",
      fedexId: "",
      phone: "",
      email: "",
      currentAddress: {
        street: "",
        city: "",
        state: "",
        zip: "",
        yearsAtAddress: 0,
        monthsAtAddress: 0,
      },
      previousAddresses: [],
    },
    positionEligibility: {
      positionAppliedFor: defaultPosition,
      employmentType: isTeam ? "team" : "full-time",
      availableStartDate: "",
      authorizedToWorkUS: "yes",
      is21OrOlder: "yes",
      priorEmploymentWithEagle: {
        hasWorkedHereBefore: "no",
        when: "",
        position: "",
      },
      teamPartner: isTeam ? { name: "", phone: "", email: "" } : undefined,
    },
    cdlInfo: {
      licenseType: "CDL-A",
      licenseNumber: "",
      issuingState: "",
      expirationDate: "",
      endorsements: [],
      cdlValidUnrestricted: "yes",
      cdlRestrictionExplanation: "",
      dotMedicalValid: "yes",
      dotMedicalExpiration: "",
      licenseDeniedHistory: { hasBeenDenied: "no", explanation: "" },
      licenseSuspendedHistory: { hasBeenSuspendedOrRevoked: "no", explanation: "" },
    },
    drivingExperience: {
      totalYearsCdlA: 0,
      equipmentExperience: [
        {
          equipmentType: "",
          years: 0,
          months: 0,
          avgMilesPerWeek: undefined,
          regions: "",
          linehaul: false,
          local: false,
          nightDriving: false,
          mountainRoutes: false,
          majorCarriers: "",
        },
      ],
    },
    employmentHistory: {
      employers: [
        {
          name: "",
          city: "",
          state: "",
          phone: "",
          startDate: "",
          endDate: "",
          position: "",
          dotSafetySensitive: "yes",
          reasonForLeaving: "",
          mayContact: "yes",
        },
      ],
      certifyLast3YearsListed: false,
      certifyLast10YearsDrivingListed: false,
    },
    accidentHistory: [],
    trafficViolations: [],
    duiHistory: { hasDuiOrRefusal: "no", details: "" },
    dotDrugAlcohol: {
      positiveOrRefusedLast2Years: "no",
      positiveOrRefusedDetails: "",
      currentDotDisqualification: "no",
      disqualificationDetails: "",
      consentDrugTesting: false,
      consentHistoryRelease: false,
    },
    backgroundCheck: {
      consentBackgroundInvestigation: false,
      consentEmployerRecordRelease: false,
    },
    workPreferences: {
      solo: undefined,
      team: undefined,
      nightShift: undefined,
      dayShift: undefined,
      weekend: undefined,
      homeTimePreference: "",
      willingDedicated: undefined,
      willingLinehaul: undefined,
      minWeeklyMilesOrIncome: "",
    },
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
      altPhone: "",
    },
    cultureFit: { aboutYou: "" },
    attachments: { cdlFront: "", cdlBack: "", dotMedical: "", mvr: "", resume: "" },
    certification: {
      certificationTextAccepted: false,
      signatureName: "",
      signatureDate: "",
      signatureConsentCheckbox: false,
    },
    meta: {
      source: "Direct",
      utm_campaign: "",
      utm_medium: "",
      utm_source: "",
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      website: "",
    },
  }), [defaultPosition, isTeam]);

  const form = useForm<ApplicantInput>({
    resolver: zodResolver(applicantSchema),
    defaultValues,
    mode: "onBlur",
  });

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;
  // eslint-disable-next-line react-hooks/incompatible-library
  const employmentType = watch("positionEligibility.employmentType");

  const previousAddresses = useFieldArray({ control, name: "personalInfo.previousAddresses" });
  const equipmentExperience = useFieldArray({ control, name: "drivingExperience.equipmentExperience" });
  const employers = useFieldArray({ control, name: "employmentHistory.employers" });
  const accidents = useFieldArray({ control, name: "accidentHistory" });
  const violations = useFieldArray({ control, name: "trafficViolations" });

  const steps = [
    { id: "personal", title: "Personal & Eligibility", description: "Identity, address history, and work authorization" },
    { id: "cdl", title: "CDL & Experience", description: "License details, medical card, and equipment experience" },
    { id: "employment", title: "Employment & Safety", description: "Work history, accidents, violations, DOT questions" },
    { id: "preferences", title: "Preferences & Contact", description: "Route preferences, emergency contact, culture" },
    { id: "attachments", title: "Attachments & Signature", description: "Optional uploads and final certification" },
  ];

  const stepFields: Record<string, FieldPath<ApplicantInput>[]> = {
    personal: [
      "personalInfo.fullName",
      "personalInfo.dob",
      "personalInfo.phone",
      "personalInfo.email",
      "personalInfo.currentAddress.street",
      "personalInfo.currentAddress.city",
      "personalInfo.currentAddress.state",
      "personalInfo.currentAddress.zip",
      "personalInfo.currentAddress.yearsAtAddress",
      "personalInfo.currentAddress.monthsAtAddress",
      "personalInfo.previousAddresses",
      "positionEligibility.positionAppliedFor",
      "positionEligibility.employmentType",
      "positionEligibility.availableStartDate",
      "positionEligibility.authorizedToWorkUS",
      "positionEligibility.is21OrOlder",
      "positionEligibility.priorEmploymentWithEagle.hasWorkedHereBefore",
      "positionEligibility.priorEmploymentWithEagle.when",
      "positionEligibility.priorEmploymentWithEagle.position",
      "positionEligibility.teamPartner.name",
      "positionEligibility.teamPartner.phone",
      "positionEligibility.teamPartner.email",
    ],
    cdl: [
      "cdlInfo.licenseType",
      "cdlInfo.licenseNumber",
      "cdlInfo.issuingState",
      "cdlInfo.expirationDate",
      "cdlInfo.cdlValidUnrestricted",
      "cdlInfo.cdlRestrictionExplanation",
      "cdlInfo.dotMedicalValid",
      "cdlInfo.dotMedicalExpiration",
      "cdlInfo.licenseDeniedHistory.hasBeenDenied",
      "cdlInfo.licenseDeniedHistory.explanation",
      "cdlInfo.licenseSuspendedHistory.hasBeenSuspendedOrRevoked",
      "cdlInfo.licenseSuspendedHistory.explanation",
      "drivingExperience.totalYearsCdlA",
      "drivingExperience.equipmentExperience",
    ],
    employment: [
      "employmentHistory.employers",
      "employmentHistory.certifyLast3YearsListed",
      "employmentHistory.certifyLast10YearsDrivingListed",
      "accidentHistory",
      "trafficViolations",
      "duiHistory.hasDuiOrRefusal",
      "duiHistory.details",
      "dotDrugAlcohol.positiveOrRefusedLast2Years",
      "dotDrugAlcohol.positiveOrRefusedDetails",
      "dotDrugAlcohol.currentDotDisqualification",
      "dotDrugAlcohol.disqualificationDetails",
      "dotDrugAlcohol.consentDrugTesting",
      "dotDrugAlcohol.consentHistoryRelease",
      "backgroundCheck.consentBackgroundInvestigation",
      "backgroundCheck.consentEmployerRecordRelease",
    ],
    preferences: [
      "emergencyContact.name",
      "emergencyContact.relationship",
      "emergencyContact.phone",
    ],
    attachments: [
      "certification.signatureName",
      "certification.signatureDate",
      "certification.certificationTextAccepted",
      "certification.signatureConsentCheckbox",
    ],
  };

  const onSubmit = async (values: ApplicantInput) => {
    setStatus("loading");
    const res = await fetch("/api/applicants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setStatus(res.ok ? "ok" : "error");
  };

  const handleFileCapture = (field: keyof ApplicantInput["attachments"]) => async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setValue(`attachments.${field}`, result, { shouldValidate: false });
    };
    reader.readAsDataURL(file);
  };

  const currentStepId = steps[currentStep].id;

  const goNext = async () => {
    const fields = stepFields[currentStepId] ?? [];
    const ok = await form.trigger(fields, { shouldFocus: true });
    if (!ok) return;
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  // Scroll to first error on submit failure
  useEffect(() => {
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      const el = document.querySelector("[data-error='true']");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [errors]);

  useEffect(() => {
    const el = formRef.current;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 16;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [currentStep]);

  return (
    <div ref={formRef} className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-100">Step {currentStep + 1} of {steps.length}</p>
          <h2 className="text-2xl font-semibold text-white">{steps[currentStep].title}</h2>
          <p className="text-sm text-slate-200/85">{steps[currentStep].description}</p>
        </div>
        <div className="flex h-2 w-40 overflow-hidden rounded-full bg-white/10">
          <div className="bg-cyan-400" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {currentStepId === "personal" && (
          <div className="space-y-4">
            <Section title="Personal information">
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Full legal name" required error={errors.personalInfo?.fullName?.message} {...register("personalInfo.fullName")} />
                <Field label="Date of birth" type="date" max={dobMax} required error={errors.personalInfo?.dob?.message} {...register("personalInfo.dob")} />
                <div className="space-y-1">
                  <Field label="FedEx ID (if you already have one)" placeholder="Optional" error={errors.personalInfo?.fedexId?.message} {...register("personalInfo.fedexId")} />
                  <p className="text-xs text-slate-200/80">Helps us confirm eligibility quickly; leave blank if you do not have one yet.</p>
                </div>
                <Field label="Mobile phone" required error={errors.personalInfo?.phone?.message} {...register("personalInfo.phone")} />
                <Field label="Email" type="email" required error={errors.personalInfo?.email?.message} {...register("personalInfo.email")} />
              </div>
            </Section>

            <Section title="Current address">
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Street" required error={errors.personalInfo?.currentAddress?.street?.message} {...register("personalInfo.currentAddress.street")} />
                <Field label="City" required error={errors.personalInfo?.currentAddress?.city?.message} {...register("personalInfo.currentAddress.city")} />
                <Select label="State" required error={errors.personalInfo?.currentAddress?.state?.message} options={stateOptions} {...register("personalInfo.currentAddress.state")} />
                <Field label="ZIP" required error={errors.personalInfo?.currentAddress?.zip?.message} {...register("personalInfo.currentAddress.zip")} />
                <Field label="Years at address" type="number" required error={errors.personalInfo?.currentAddress?.yearsAtAddress?.message} {...register("personalInfo.currentAddress.yearsAtAddress", { valueAsNumber: true })} />
                <Field label="Months at address" type="number" required error={errors.personalInfo?.currentAddress?.monthsAtAddress?.message} {...register("personalInfo.currentAddress.monthsAtAddress", { valueAsNumber: true })} />
              </div>

              <div className="mt-3 space-y-2">
                <p className="text-sm text-slate-200/85">If less than 3 years at current address, list previous addresses.</p>
                {errors.personalInfo?.previousAddresses && (
                  <p className="text-sm text-destructive" data-error="true">
                    {errors.personalInfo?.previousAddresses?.message as string}
                  </p>
                )}
                {previousAddresses.fields.map((field, idx) => (
                  <div key={field.id} className="grid gap-3 rounded-xl border border-white/10 bg-black/20 p-3 md:grid-cols-2">
                    <Field label="Street" {...register(`personalInfo.previousAddresses.${idx}.street` as const)} />
                    <Field label="City" {...register(`personalInfo.previousAddresses.${idx}.city` as const)} />
                    <Select label="State" options={stateOptions} {...register(`personalInfo.previousAddresses.${idx}.state` as const)} />
                    <Field label="ZIP" {...register(`personalInfo.previousAddresses.${idx}.zip` as const)} />
                    <Field label="From date" type="date" {...register(`personalInfo.previousAddresses.${idx}.fromDate` as const)} />
                    <Field label="To date" type="date" {...register(`personalInfo.previousAddresses.${idx}.toDate` as const)} />
                    <button type="button" className="text-left text-xs text-red-300 underline" onClick={() => previousAddresses.remove(idx)}>
                      Remove address
                    </button>
                  </div>
                ))}
                <button type="button" className="text-sm text-cyan-200 underline" onClick={() => previousAddresses.append({ street: "", city: "", state: "", zip: "", fromDate: "", toDate: "" })}>
                  + Add previous address
                </button>
              </div>
            </Section>

            <Section title="Position & eligibility">
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Position applied for" required error={errors.positionEligibility?.positionAppliedFor?.message} {...register("positionEligibility.positionAppliedFor")} />
                <Select
                  label="Employment type"
                  required
                  options={[
                    { label: "Full-time", value: "full-time" },
                    { label: "Part-time", value: "part-time" },
                    { label: "Team", value: "team" },
                  ]}
                  error={errors.positionEligibility?.employmentType?.message}
                  {...register("positionEligibility.employmentType")}
                />
                <Field label="Available start date" type="date" required error={errors.positionEligibility?.availableStartDate?.message} {...register("positionEligibility.availableStartDate")} />
                <Select label="Authorized to work in U.S.?" required options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]} error={errors.positionEligibility?.authorizedToWorkUS?.message} {...register("positionEligibility.authorizedToWorkUS")} />
                <Select label="At least 21 years old?" required options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]} error={errors.positionEligibility?.is21OrOlder?.message} {...register("positionEligibility.is21OrOlder")} />
                <Select label="Worked for Eagle Family Carriers before?" required options={[{ label: "No", value: "no" }, { label: "Yes", value: "yes" }]} error={errors.positionEligibility?.priorEmploymentWithEagle?.hasWorkedHereBefore?.message} {...register("positionEligibility.priorEmploymentWithEagle.hasWorkedHereBefore")} />
                <Field label="If yes, when?" error={errors.positionEligibility?.priorEmploymentWithEagle?.when?.message} {...register("positionEligibility.priorEmploymentWithEagle.when")} />
                <Field label="If yes, position?" error={errors.positionEligibility?.priorEmploymentWithEagle?.position?.message} {...register("positionEligibility.priorEmploymentWithEagle.position")} />
              </div>
              {employmentType === "team" && (
                <div className="mt-3 grid gap-3 rounded-xl border border-white/10 bg-black/15 p-3 md:grid-cols-3">
                  <Field label="Co-driver name" {...register("positionEligibility.teamPartner.name")} />
                  <Field label="Co-driver phone" {...register("positionEligibility.teamPartner.phone")} />
                  <Field label="Co-driver email" type="email" {...register("positionEligibility.teamPartner.email")} />
                </div>
              )}
            </Section>
          </div>
        )}

        {currentStepId === "cdl" && (
          <div className="space-y-4">
            <Section title="CDL & license">
              <div className="grid gap-3 md:grid-cols-2">
                <Select label="License type" required options={[{ label: "CDL-A", value: "CDL-A" }, { label: "CDL-B", value: "CDL-B" }, { label: "Other", value: "Other" }]} error={errors.cdlInfo?.licenseType?.message} {...register("cdlInfo.licenseType")} />
                <Field label="License number" required error={errors.cdlInfo?.licenseNumber?.message} {...register("cdlInfo.licenseNumber")} />
                <Select label="Issuing state" required options={stateOptions} error={errors.cdlInfo?.issuingState?.message} {...register("cdlInfo.issuingState")} />
                <Field label="License expiration" type="date" required error={errors.cdlInfo?.expirationDate?.message} {...register("cdlInfo.expirationDate")} />
                <Select label="CDL valid and unrestricted?" required options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]} error={errors.cdlInfo?.cdlValidUnrestricted?.message} {...register("cdlInfo.cdlValidUnrestricted")} />
                <Field label="If no, explain" error={errors.cdlInfo?.cdlRestrictionExplanation?.message} {...register("cdlInfo.cdlRestrictionExplanation")} />
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                {endorsementOptions.map((endorsement) => (
                  <label key={endorsement.value} className="flex items-center gap-2">
                    <input type="checkbox" value={endorsement.value} {...register("cdlInfo.endorsements")} />
                    <span>{endorsement.label}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-slate-200/80">
                Select all that apply. T = Doubles/Triples (FedEx Ground), H = Hazmat, X = Tank + Hazmat. Leave blank if none.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <Select label="Current DOT medical card valid?" required options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]} error={errors.cdlInfo?.dotMedicalValid?.message} {...register("cdlInfo.dotMedicalValid")} />
                <Field label="DOT medical expiration" type="date" error={errors.cdlInfo?.dotMedicalExpiration?.message} {...register("cdlInfo.dotMedicalExpiration")} />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <Select label="Ever denied license/permit/privilege?" required options={[{ label: "No", value: "no" }, { label: "Yes", value: "yes" }]} error={errors.cdlInfo?.licenseDeniedHistory?.hasBeenDenied?.message} {...register("cdlInfo.licenseDeniedHistory.hasBeenDenied")} />
                <Field label="If yes, explain" error={errors.cdlInfo?.licenseDeniedHistory?.explanation?.message} {...register("cdlInfo.licenseDeniedHistory.explanation")} />
                <Select label="Any license suspended or revoked?" required options={[{ label: "No", value: "no" }, { label: "Yes", value: "yes" }]} error={errors.cdlInfo?.licenseSuspendedHistory?.hasBeenSuspendedOrRevoked?.message} {...register("cdlInfo.licenseSuspendedHistory.hasBeenSuspendedOrRevoked")} />
                <Field label="If yes, explain" error={errors.cdlInfo?.licenseSuspendedHistory?.explanation?.message} {...register("cdlInfo.licenseSuspendedHistory.explanation")} />
              </div>
            </Section>

            <Section title="Driving experience">
              <div className="grid gap-3 md:grid-cols-3">
                <Field label="Total years CDL-A" type="number" required error={errors.drivingExperience?.totalYearsCdlA?.message} {...register("drivingExperience.totalYearsCdlA", { valueAsNumber: true })} />
              </div>
              <div className="space-y-3">
                {equipmentExperience.fields.map((field, idx) => (
                  <div key={field.id} className="grid gap-3 rounded-xl border border-white/10 bg-black/20 p-3 md:grid-cols-3">
                    <Field label="Equipment type" required {...register(`drivingExperience.equipmentExperience.${idx}.equipmentType` as const)} />
                    <Field label="Years" type="number" required {...register(`drivingExperience.equipmentExperience.${idx}.years` as const, { valueAsNumber: true })} />
                    <Field label="Months" type="number" required {...register(`drivingExperience.equipmentExperience.${idx}.months` as const, { valueAsNumber: true })} />
                    <Field label="Avg miles/week" type="number" {...register(`drivingExperience.equipmentExperience.${idx}.avgMilesPerWeek` as const, { valueAsNumber: true })} />
                    <Field label="Regions operated" {...register(`drivingExperience.equipmentExperience.${idx}.regions` as const)} />
                    <Field label="Major carriers (FedEx/UPS/Amazon/etc.)" {...register(`drivingExperience.equipmentExperience.${idx}.majorCarriers` as const)} />
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" {...register(`drivingExperience.equipmentExperience.${idx}.linehaul` as const)} />
                      <span>Linehaul</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" {...register(`drivingExperience.equipmentExperience.${idx}.local` as const)} />
                      <span>Local/P&D</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" {...register(`drivingExperience.equipmentExperience.${idx}.nightDriving` as const)} />
                      <span>Night driving</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" {...register(`drivingExperience.equipmentExperience.${idx}.mountainRoutes` as const)} />
                      <span>Mountain routes</span>
                    </label>
                    <button type="button" className="text-left text-xs text-red-300 underline" onClick={() => equipmentExperience.remove(idx)}>
                      Remove equipment
                    </button>
                  </div>
                ))}
                <button type="button" className="text-sm text-cyan-200 underline" onClick={() => equipmentExperience.append({ equipmentType: "", years: 0, months: 0, avgMilesPerWeek: undefined, regions: "", linehaul: false, local: false, nightDriving: false, mountainRoutes: false, majorCarriers: "" })}>
                  + Add equipment type
                </button>
              </div>
            </Section>
          </div>
        )}

        {currentStepId === "employment" && (
          <div className="space-y-4">
            <Section title="Employment history (last 3 years, driving last 10)">
              <div className="space-y-3">
                {employers.fields.map((field, idx) => (
                  <div key={field.id} className="grid gap-3 rounded-xl border border-white/10 bg-black/20 p-3 md:grid-cols-3">
                    <Field label="Employer name" required {...register(`employmentHistory.employers.${idx}.name` as const)} />
                    <Field label="City" required {...register(`employmentHistory.employers.${idx}.city` as const)} />
                    <Select label="State" required options={stateOptions} {...register(`employmentHistory.employers.${idx}.state` as const)} />
                    <Field label="Employer phone" required {...register(`employmentHistory.employers.${idx}.phone` as const)} />
                    <Field label="Start date" type="date" required {...register(`employmentHistory.employers.${idx}.startDate` as const)} />
                    <Field label="End date (or Present)" type="date" required {...register(`employmentHistory.employers.${idx}.endDate` as const)} />
                    <Field label="Position held" required {...register(`employmentHistory.employers.${idx}.position` as const)} />
                    <Select label="DOT/safety-sensitive driving?" required options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]} {...register(`employmentHistory.employers.${idx}.dotSafetySensitive` as const)} />
                    <Field label="Reason for leaving" required {...register(`employmentHistory.employers.${idx}.reasonForLeaving` as const)} />
                    <Select label="May we contact this employer?" required options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]} {...register(`employmentHistory.employers.${idx}.mayContact` as const)} />
                    <button type="button" className="text-left text-xs text-red-300 underline" onClick={() => employers.remove(idx)}>
                      Remove employer
                    </button>
                  </div>
                ))}
                <button type="button" className="text-sm text-cyan-200 underline" onClick={() => employers.append({ name: "", city: "", state: "", phone: "", startDate: "", endDate: "", position: "", dotSafetySensitive: "yes", reasonForLeaving: "", mayContact: "yes" })}>
                  + Add employer
                </button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...register("employmentHistory.certifyLast3YearsListed")} />
                  <span>I have listed all employment (driving and non-driving) for the last 3 years.</span>
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...register("employmentHistory.certifyLast10YearsDrivingListed")} />
                  <span>I have listed all commercial driving positions for the last 10 years.</span>
                </label>
              </div>
            </Section>

            <Section title="Accident / crash history (last 3–5 years)">
              <p className="text-sm text-slate-200/80">Leave empty if none.</p>
              {accidents.fields.map((field, idx) => (
                <div key={field.id} className="mt-3 grid gap-3 rounded-xl border border-white/10 bg-black/20 p-3 md:grid-cols-3">
                  <Field label="Date" type="date" {...register(`accidentHistory.${idx}.date` as const)} />
                  <Field label="City" {...register(`accidentHistory.${idx}.city` as const)} />
                  <Select label="State" options={stateOptions} {...register(`accidentHistory.${idx}.state` as const)} />
                  <Field label="Vehicle type" {...register(`accidentHistory.${idx}.vehicleType` as const)} />
                  <Field label="Description" {...register(`accidentHistory.${idx}.description` as const)} />
                  <Field label="Injuries (count)" type="number" {...register(`accidentHistory.${idx}.injuries` as const)} />
                  <Field label="Fatalities (count)" type="number" {...register(`accidentHistory.${idx}.fatalities` as const)} />
                  <Select label="Citation issued?" options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]} {...register(`accidentHistory.${idx}.citationIssued` as const)} />
                  <Field label="Citation details" {...register(`accidentHistory.${idx}.citationDetails` as const)} />
                  <Select label="Preventable?" options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]} {...register(`accidentHistory.${idx}.preventable` as const)} />
                  <Field label="Preventability explanation" {...register(`accidentHistory.${idx}.preventabilityExplanation` as const)} />
                  <button type="button" className="text-left text-xs text-red-300 underline" onClick={() => accidents.remove(idx)}>
                    Remove accident
                  </button>
                </div>
              ))}
              <button type="button" className="text-sm text-cyan-200 underline" onClick={() => accidents.append({ date: "", city: "", state: "", vehicleType: "", description: "", injuries: "", fatalities: "", citationIssued: "no", citationDetails: "", preventable: "no", preventabilityExplanation: "" })}>
                + Add accident
              </button>
            </Section>

            <Section title="Traffic violations (last 3 years)">
              <p className="text-sm text-slate-200/80">Leave empty if none.</p>
              {violations.fields.map((field, idx) => (
                <div key={field.id} className="mt-3 grid gap-3 rounded-xl border border-white/10 bg-black/20 p-3 md:grid-cols-3">
                  <Field label="Date" type="date" {...register(`trafficViolations.${idx}.date` as const)} />
                  <Field label="City" {...register(`trafficViolations.${idx}.city` as const)} />
                  <Select label="State" options={stateOptions} {...register(`trafficViolations.${idx}.state` as const)} />
                  <Field label="Violation type" {...register(`trafficViolations.${idx}.violationType` as const)} />
                  <Select label="Vehicle type" options={[{ label: "Commercial", value: "commercial" }, { label: "Personal", value: "personal" }]} {...register(`trafficViolations.${idx}.vehicleType` as const)} />
                  <Field label="Final disposition" {...register(`trafficViolations.${idx}.disposition` as const)} />
                  <button type="button" className="text-left text-xs text-red-300 underline" onClick={() => violations.remove(idx)}>
                    Remove violation
                  </button>
                </div>
              ))}
              <button type="button" className="text-sm text-cyan-200 underline" onClick={() => violations.append({ date: "", city: "", state: "", violationType: "", vehicleType: "commercial", disposition: "" })}>
                + Add violation
              </button>
            </Section>

            <Section title="DUI / DOT drug & alcohol">
              <div className="grid gap-3 md:grid-cols-2">
                <Select label="Ever convicted of DUI/DWI or refused chemical test?" required options={[{ label: "No", value: "no" }, { label: "Yes", value: "yes" }]} {...register("duiHistory.hasDuiOrRefusal")} />
                <Field label="If yes, explain with dates" {...register("duiHistory.details")} />
                <Select label="Tested positive or refused DOT test (last 2 years)?" required options={[{ label: "No", value: "no" }, { label: "Yes", value: "yes" }]} {...register("dotDrugAlcohol.positiveOrRefusedLast2Years")} />
                <Field label="If yes, details" {...register("dotDrugAlcohol.positiveOrRefusedDetails")} />
                <Select label="Currently under any DOT driving disqualification?" required options={[{ label: "No", value: "no" }, { label: "Yes", value: "yes" }]} {...register("dotDrugAlcohol.currentDotDisqualification")} />
                <Field label="If yes, details" {...register("dotDrugAlcohol.disqualificationDetails")} />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...register("dotDrugAlcohol.consentDrugTesting")} />
                  <span>I consent to required pre-employment drug and alcohol testing.</span>
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...register("dotDrugAlcohol.consentHistoryRelease")} />
                  <span>I consent to release of my DOT drug and alcohol testing history (FMCSA).</span>
                </label>
              </div>
            </Section>

            <Section title="Background check authorization">
              <div className="grid gap-3 md:grid-cols-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...register("backgroundCheck.consentBackgroundInvestigation")} />
                  <span>I authorize background investigation.</span>
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...register("backgroundCheck.consentEmployerRecordRelease")} />
                  <span>I authorize previous employers to release safety performance records.</span>
                </label>
              </div>
            </Section>
          </div>
        )}

        {currentStepId === "preferences" && (
          <div className="space-y-4">
            <Section title="Work & schedule preferences (optional)">
              <div className="grid gap-3 md:grid-cols-2">
                <Toggle label="Solo" {...register("workPreferences.solo")} />
                <Toggle label="Team" {...register("workPreferences.team")} />
                <Toggle label="Night shift" {...register("workPreferences.nightShift")} />
                <Toggle label="Day shift" {...register("workPreferences.dayShift")} />
                <Toggle label="Weekend" {...register("workPreferences.weekend")} />
                <Toggle label="Willing: Dedicated" {...register("workPreferences.willingDedicated")} />
                <Toggle label="Willing: Linehaul" {...register("workPreferences.willingLinehaul")} />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Preferred home time" {...register("workPreferences.homeTimePreference")} />
                <Field label="Minimum weekly miles/income expectation" {...register("workPreferences.minWeeklyMilesOrIncome")} />
              </div>
            </Section>

            <Section title="Emergency contact">
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Name" required error={errors.emergencyContact?.name?.message} {...register("emergencyContact.name")} />
                <Field label="Relationship" required error={errors.emergencyContact?.relationship?.message} {...register("emergencyContact.relationship")} />
                <Field label="Phone" required error={errors.emergencyContact?.phone?.message} {...register("emergencyContact.phone")} />
                <Field label="Alt phone (optional)" {...register("emergencyContact.altPhone")} />
              </div>
            </Section>

            <Section title="About you (optional)">
              <textarea
                className="w-full rounded border border-white/15 bg-black/20 px-3 py-2 text-sm"
                rows={3}
                placeholder="In a few sentences, tell us what kind of team and culture you’re looking for."
                {...register("cultureFit.aboutYou")}
              />
            </Section>
          </div>
        )}

        {currentStepId === "attachments" && (
          <div className="space-y-4">
            <Section title="Optional attachments (uploads)">
              <p className="text-sm text-slate-200/80">Uploads are optional; you can provide later if needed.</p>
              <div className="grid gap-3 md:grid-cols-2">
                <FileField label="Upload CDL front" onChange={handleFileCapture("cdlFront")} />
                <FileField label="Upload CDL back" onChange={handleFileCapture("cdlBack")} />
                <FileField label="Upload DOT medical card" onChange={handleFileCapture("dotMedical")} />
                <FileField label="Upload recent MVR" onChange={handleFileCapture("mvr")} />
                <FileField label="Upload resume" onChange={handleFileCapture("resume")} />
              </div>
            </Section>

            <Section title="Certification & signature">
              <p className="text-xs text-slate-200/80">
                By signing, you certify the information provided is true and complete, and you authorize verification of all statements above.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Typed full name" required error={errors.certification?.signatureName?.message} {...register("certification.signatureName")} />
                <Field label="Signature date" type="date" required error={errors.certification?.signatureDate?.message} {...register("certification.signatureDate")} />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" {...register("certification.certificationTextAccepted")} />
                <span>I certify that this information is true and complete.</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" {...register("certification.signatureConsentCheckbox")} />
                <span>I agree that this typed name constitutes my electronic signature.</span>
              </label>
            </Section>
          </div>
        )}

        <div className="flex items-center justify-between gap-3 pt-2">
          <button type="button" onClick={goPrev} disabled={currentStep === 0} className="rounded-md border border-white/20 px-4 py-2 text-sm text-white disabled:opacity-50">
            Back
          </button>
          {currentStep < steps.length - 1 ? (
            <button type="button" onClick={goNext} className="rounded-md border border-white/25 bg-white/15 px-4 py-2 text-sm text-white shadow-lg shadow-black/30 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20">
              Next
            </button>
          ) : (
            <button type="submit" disabled={status === "loading"} className="rounded-md border border-white/25 bg-white/15 px-5 py-2 text-sm text-white shadow-lg shadow-black/30 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20 disabled:opacity-60">
              {status === "loading" ? "Submitting…" : "Submit application"}
            </button>
          )}
        </div>

        {status === "ok" && <p className="text-sm text-green-400">Application received. We’ll respond within 24 hours.</p>}
        {status === "error" && <p className="text-sm text-destructive">There was an issue submitting. Please try again.</p>}
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-black/25 p-4 shadow-inner shadow-black/30">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}

function formatDateInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const Field = ({ label, error, required, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; required?: boolean }) => (
  <label className="block text-sm text-slate-100/90">
    <span className="mb-1 block font-medium text-white">
      {label} {required ? "*" : ""}
    </span>
    <input className="mt-1 w-full rounded border border-white/15 bg-black/30 px-3 py-2 text-white" data-error={Boolean(error)} {...rest} />
    {error && <p className="text-xs text-destructive">{error}</p>}
  </label>
);

function Select({
  label,
  options,
  error,
  required,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: ({ label: string; value: string } | string)[]; error?: string; required?: boolean }) {
  const normalized = options.map((o) => (typeof o === "string" ? { label: o, value: o } : o));
  return (
    <label className="block text-sm text-slate-100/90">
      <span className="mb-1 block font-medium text-white">
        {label} {required ? "*" : ""}
      </span>
      <select className="mt-1 w-full rounded border border-white/15 bg-black/30 px-3 py-2 text-white" data-error={Boolean(error)} {...rest}>
        <option value="">Select</option>
        {normalized.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </label>
  );
}

function Toggle({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-100/85">
      <input type="checkbox" {...rest} />
      <span>{label}</span>
    </label>
  );
}

function FileField({ label, onChange }: { label: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <label className="block text-sm text-slate-100/90">
      <span className="mb-1 block font-medium text-white">{label}</span>
      <input type="file" className="mt-1 w-full rounded border border-white/15 bg-black/30 px-3 py-2 text-white" onChange={onChange} />
    </label>
  );
}
