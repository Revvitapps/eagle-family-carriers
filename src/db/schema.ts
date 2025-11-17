import { pgEnum, pgTable, text, timestamp, uuid, varchar, date, jsonb } from "drizzle-orm/pg-core";

export const applicantStatus = pgEnum("applicant_status", [
  "APPLIED",
  "CONTACTED",
  "CALL_SCHEDULED",
  "RIDE_ALONG",
  "HIRED",
  "REJECTED",
]);

export const applicants = pgTable("applicants", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email"),
  phone: text("phone"),
  city: text("city"),
  state: varchar("state", { length: 2 }),
  cdlClass: text("cdl_class"),
  yearsExperience: text("years_experience"),
  endorsements: text("endorsements").array(),
  availabilityDate: date("availability_date"),
  shiftPref: text("shift_pref"),
  terminalPref: text("terminal_pref"),
  resumeUrl: text("resume_url"),
  notes: text("notes"),
  status: applicantStatus("status").default("APPLIED"),
  source: text("source"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  ipHash: text("ip_hash"),
  meta: jsonb("meta"), // store user_agent, openphone_thread, calendly_link, etc.
});
