import { z } from "zod";

export const applicantSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  phone: z.string().min(7, "Enter a valid phone"),
  city: z.string().min(1, "City is required"),
  state: z.string().length(2, "Use 2-letter state code"),
  cdlClass: z.enum(["A", "B", "C"]),
  yearsExperience: z.enum(["0-1", "1-3", "3-5", "5+"]),
  endorsements: z.array(z.enum(["T", "N", "H", "X"])).default([]),
  availabilityDate: z.string().optional(),
  shiftPref: z.enum(["Day", "Night", "Team"]).optional(),
  terminalPref: z.enum(["Hagerstown", "Raleigh", "Either"]).optional(),
  resumeUrl: z.string().url("Enter a valid link").optional().or(z.literal("")),
  notes: z.string().optional(),
  source: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  ip_hash: z.string().optional(),
  user_agent: z.string().optional(),
  website: z.string().max(0).optional(), // Honeypot
  consent: z.boolean().refine((v) => v === true, { message: "Consent required" }),
});

// Form inputs (pre-parse) allow optional/defaulted fields like endorsements.
export type ApplicantInput = z.input<typeof applicantSchema>;
// Parsed/validated data type when consumed elsewhere.
export type ApplicantData = z.infer<typeof applicantSchema>;
