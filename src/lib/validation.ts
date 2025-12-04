import { z } from "zod";

const yesNo = z.enum(["yes", "no"]);

const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().length(2, "State must be 2 letters"),
  zip: z.string().min(3, "ZIP required"),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
});

const employerSchema = z.object({
  name: z.string().min(1, "Employer required"),
  city: z.string().min(1, "City required"),
  state: z.string().length(2, "State must be 2 letters"),
  phone: z.string().min(7, "Phone required"),
  startDate: z.string().min(1, "Start date required"),
  endDate: z.string().min(1, "End date required"),
  position: z.string().min(1, "Position required"),
  dotSafetySensitive: yesNo,
  reasonForLeaving: z.string().min(1, "Reason required"),
  mayContact: yesNo,
});

const accidentSchema = z.object({
  date: z.string().min(1, "Date required"),
  city: z.string().min(1, "City required"),
  state: z.string().length(2, "State must be 2 letters"),
  vehicleType: z.string().min(1, "Vehicle type required"),
  description: z.string().min(1, "Description required"),
  injuries: z.string().optional(),
  fatalities: z.string().optional(),
  citationIssued: yesNo,
  citationDetails: z.string().optional(),
  preventable: yesNo,
  preventabilityExplanation: z.string().optional(),
});

const violationSchema = z.object({
  date: z.string().min(1, "Date required"),
  city: z.string().min(1, "City required"),
  state: z.string().length(2, "State must be 2 letters"),
  violationType: z.string().min(1, "Violation type required"),
  vehicleType: z.enum(["commercial", "personal"]),
  disposition: z.string().optional(),
});

const equipmentSchema = z.object({
  equipmentType: z.string().min(1, "Equipment type required"),
  years: z.number().min(0).default(0),
  months: z.number().min(0).max(11).default(0),
  avgMilesPerWeek: z.number().min(0).optional(),
  regions: z.string().optional(),
  linehaul: z.boolean().optional(),
  local: z.boolean().optional(),
  nightDriving: z.boolean().optional(),
  mountainRoutes: z.boolean().optional(),
  majorCarriers: z.string().optional(),
});

export const applicantSchema = z
  .object({
    personalInfo: z.object({
      fullName: z.string().min(1, "Full legal name is required"),
      dob: z.string().min(1, "Date of birth required"),
      ssnLast4: z.string().min(4, "Last 4 SSN required").max(4, "Use last 4"),
      phone: z.string().min(7, "Enter a valid phone"),
      email: z.string().email("Enter a valid email"),
      currentAddress: z.object({
        street: z.string().min(1, "Street is required"),
        city: z.string().min(1, "City is required"),
        state: z.string().length(2, "State must be 2 letters"),
        zip: z.string().min(3, "ZIP required"),
        yearsAtAddress: z.number().min(0, "Years required"),
        monthsAtAddress: z.number().min(0).max(11, "Months 0-11"),
      }),
      previousAddresses: z.array(addressSchema).optional(),
    }),

    positionEligibility: z.object({
      positionAppliedFor: z.string().min(1),
      employmentType: z.enum(["full-time", "part-time", "team"]),
      availableStartDate: z.string().min(1, "Start date required"),
      authorizedToWorkUS: yesNo,
      is21OrOlder: yesNo,
      priorEmploymentWithEagle: z.object({
        hasWorkedHereBefore: yesNo,
        when: z.string().optional(),
        position: z.string().optional(),
      }),
      teamPartner: z
        .object({
          name: z.string().optional(),
          phone: z.string().optional(),
          email: z.string().email("Enter a valid email").optional().or(z.literal("")),
        })
        .optional(),
    }),

    cdlInfo: z.object({
      licenseType: z.enum(["CDL-A", "CDL-B", "Other"]).default("CDL-A"),
      licenseNumber: z.string().min(1, "License number required"),
      issuingState: z.string().length(2, "State must be 2 letters"),
      expirationDate: z.string().min(1, "Expiration date required"),
      endorsements: z.array(z.enum(["T", "N", "H", "X"])).optional(),
      cdlValidUnrestricted: yesNo,
      cdlRestrictionExplanation: z.string().optional(),
      dotMedicalValid: yesNo,
      dotMedicalExpiration: z.string().optional(),
      licenseDeniedHistory: z.object({
        hasBeenDenied: yesNo,
        explanation: z.string().optional(),
      }),
      licenseSuspendedHistory: z.object({
        hasBeenSuspendedOrRevoked: yesNo,
        explanation: z.string().optional(),
      }),
    }),

    drivingExperience: z.object({
      totalYearsCdlA: z.number().min(0, "Years required"),
      equipmentExperience: z.array(equipmentSchema).min(1, "Add at least one equipment experience"),
    }),

    employmentHistory: z.object({
      employers: z.array(employerSchema).min(1, "At least one employer required"),
      certifyLast3YearsListed: z.boolean().refine((v) => v === true, { message: "Required" }),
      certifyLast10YearsDrivingListed: z.boolean().refine((v) => v === true, { message: "Required" }),
    }),

    accidentHistory: z.array(accidentSchema).optional(),

    trafficViolations: z.array(violationSchema).optional(),

    duiHistory: z.object({
      hasDuiOrRefusal: yesNo,
      details: z.string().optional(),
    }),

    dotDrugAlcohol: z.object({
      positiveOrRefusedLast2Years: yesNo,
      positiveOrRefusedDetails: z.string().optional(),
      currentDotDisqualification: yesNo,
      disqualificationDetails: z.string().optional(),
      consentDrugTesting: z.boolean().refine((v) => v === true, { message: "Required" }),
      consentHistoryRelease: z.boolean().refine((v) => v === true, { message: "Required" }),
    }),

    backgroundCheck: z.object({
      consentBackgroundInvestigation: z.boolean().refine((v) => v === true, { message: "Required" }),
      consentEmployerRecordRelease: z.boolean().refine((v) => v === true, { message: "Required" }),
    }),

    workPreferences: z.object({
      solo: z.boolean().optional(),
      team: z.boolean().optional(),
      nightShift: z.boolean().optional(),
      dayShift: z.boolean().optional(),
      weekend: z.boolean().optional(),
      homeTimePreference: z.string().optional(),
      willingDedicated: z.boolean().optional(),
      willingLinehaul: z.boolean().optional(),
      minWeeklyMilesOrIncome: z.string().optional(),
    }),

    emergencyContact: z.object({
      name: z.string().min(1, "Name required"),
      relationship: z.string().min(1, "Relationship required"),
      phone: z.string().min(7, "Phone required"),
      altPhone: z.string().optional(),
    }),

    cultureFit: z.object({
      aboutYou: z.string().optional(),
    }),

    attachments: z.object({
      cdlFront: z.string().optional(),
      cdlBack: z.string().optional(),
      dotMedical: z.string().optional(),
      mvr: z.string().optional(),
      resume: z.string().optional(),
    }),

    certification: z.object({
      certificationTextAccepted: z.boolean().refine((v) => v === true, { message: "Required" }),
      signatureName: z.string().min(1, "Signature required"),
      signatureDate: z.string().min(1, "Date required"),
      signatureConsentCheckbox: z.boolean().refine((v) => v === true, { message: "Required" }),
    }),

    meta: z.object({
      source: z.string().optional(),
      utm_source: z.string().optional(),
      utm_medium: z.string().optional(),
      utm_campaign: z.string().optional(),
      user_agent: z.string().optional(),
      website: z.string().max(0).optional(), // Honeypot
    }),
  })
  .superRefine((data, ctx) => {
    // Age check
    const dob = new Date(data.personalInfo.dob);
    if (Number.isNaN(dob.getTime())) {
      ctx.addIssue({ code: "custom", message: "Enter a valid DOB", path: ["personalInfo", "dob"] });
    } else {
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
      if (age < 21) {
        ctx.addIssue({
          code: "custom",
          message: "Must be at least 21",
          path: ["personalInfo", "dob"],
        });
      }
    }

    // Previous addresses if <3 years
    const years = data.personalInfo.currentAddress.yearsAtAddress;
    const months = data.personalInfo.currentAddress.monthsAtAddress;
    if (years * 12 + months < 36) {
      if (!data.personalInfo.previousAddresses || data.personalInfo.previousAddresses.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "List previous addresses for the last 3 years",
          path: ["personalInfo", "previousAddresses"],
        });
      }
    }

    // Conditional explanations
    if (data.cdlInfo.cdlValidUnrestricted === "no" && !data.cdlInfo.cdlRestrictionExplanation) {
      ctx.addIssue({
        code: "custom",
        message: "Explain CDL restriction",
        path: ["cdlInfo", "cdlRestrictionExplanation"],
      });
    }
    if (data.cdlInfo.dotMedicalValid === "yes" && !data.cdlInfo.dotMedicalExpiration) {
      ctx.addIssue({
        code: "custom",
        message: "Enter DOT medical expiration",
        path: ["cdlInfo", "dotMedicalExpiration"],
      });
    }
    if (data.cdlInfo.licenseDeniedHistory.hasBeenDenied === "yes" && !data.cdlInfo.licenseDeniedHistory.explanation) {
      ctx.addIssue({
        code: "custom",
        message: "Explain license denial",
        path: ["cdlInfo", "licenseDeniedHistory", "explanation"],
      });
    }
    if (data.cdlInfo.licenseSuspendedHistory.hasBeenSuspendedOrRevoked === "yes" && !data.cdlInfo.licenseSuspendedHistory.explanation) {
      ctx.addIssue({
        code: "custom",
        message: "Explain suspension/revocation",
        path: ["cdlInfo", "licenseSuspendedHistory", "explanation"],
      });
    }
    if (data.duiHistory.hasDuiOrRefusal === "yes" && !data.duiHistory.details) {
      ctx.addIssue({ code: "custom", message: "Provide DUI/refusal details", path: ["duiHistory", "details"] });
    }
    if (data.dotDrugAlcohol.positiveOrRefusedLast2Years === "yes" && !data.dotDrugAlcohol.positiveOrRefusedDetails) {
      ctx.addIssue({
        code: "custom",
        message: "Provide DOT test details",
        path: ["dotDrugAlcohol", "positiveOrRefusedDetails"],
      });
    }
    if (data.dotDrugAlcohol.currentDotDisqualification === "yes" && !data.dotDrugAlcohol.disqualificationDetails) {
      ctx.addIssue({
        code: "custom",
        message: "Provide disqualification details",
        path: ["dotDrugAlcohol", "disqualificationDetails"],
      });
    }
  });

export type ApplicantInput = z.input<typeof applicantSchema>;
export type ApplicantData = z.infer<typeof applicantSchema>;
