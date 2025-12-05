import { pgTable, text, serial, integer, boolean, date, numeric, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  role: text("role").default("user"),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow(),
  servicesPurchased: jsonb("services_purchased").default('[]'),
  consultationsBooked: jsonb("consultations_booked").default('[]'),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  role: true,
  email: true,
  servicesPurchased: true,
  consultationsBooked: true,
});

export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  industry: text("industry"),
  size: text("size"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertOrganizationSchema = createInsertSchema(organizations).pick({
  name: true,
  industry: true,
  size: true,
});

export const emissionsData = pgTable("emissions_data", {
  id: serial("id").primaryKey(),
  organizationId: integer("organization_id"),
  year: integer("year").notNull(),
  month: integer("month").notNull(),
  scope1: numeric("scope_1"),
  scope2: numeric("scope_2"),
  scope3: numeric("scope_3"),
  scope1Breakdown: jsonb("scope_1_breakdown"),
  scope2Breakdown: jsonb("scope_2_breakdown"),
  scope3Breakdown: jsonb("scope_3_breakdown"),
  units: text("units").default("tCO2e"),
  notes: text("notes"),
  createdBy: integer("created_by"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertEmissionsDataSchema = createInsertSchema(emissionsData).pick({
  organizationId: true,
  year: true,
  month: true,
  scope1: true,
  scope2: true,
  scope3: true,
  scope1Breakdown: true,
  scope2Breakdown: true,
  scope3Breakdown: true,
  units: true,
  notes: true,
  createdBy: true,
});

export const resourceConsumption = pgTable("resource_consumption", {
  id: serial("id").primaryKey(),
  organizationId: integer("organization_id"),
  year: integer("year").notNull(),
  month: integer("month").notNull(),
  resourceType: text("resource_type").notNull(), // energy, water, waste
  amount: numeric("amount").notNull(),
  units: text("units").notNull(),
  notes: text("notes"),
  createdBy: integer("created_by"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertResourceConsumptionSchema = createInsertSchema(resourceConsumption).pick({
  organizationId: true,
  year: true,
  month: true,
  resourceType: true,
  amount: true,
  units: true,
  notes: true,
  createdBy: true,
});

export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  organizationId: integer("organization_id"),
  reportName: text("report_name").notNull(),
  reportType: text("report_type").notNull(), // GRI, TCFD, ESRS, etc.
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  status: text("status").default("draft"), // draft, in-progress, completed
  data: jsonb("data"),
  createdBy: integer("created_by"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertReportSchema = createInsertSchema(reports).pick({
  organizationId: true,
  reportName: true,
  reportType: true,
  startDate: true,
  endDate: true,
  status: true,
  data: true,
  createdBy: true,
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  organizationId: integer("organization_id"),
  activityType: text("activity_type").notNull(), // data_update, report_generation, etc.
  description: text("description").notNull(),
  details: jsonb("details"),
  status: text("status").notNull(), // completed, failed, in-progress
  userId: integer("user_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertActivitySchema = createInsertSchema(activities).pick({
  organizationId: true,
  activityType: true,
  description: true,
  details: true,
  status: true,
  userId: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertOrganization = z.infer<typeof insertOrganizationSchema>;
export type Organization = typeof organizations.$inferSelect;

export type InsertEmissionsData = z.infer<typeof insertEmissionsDataSchema>;
export type EmissionsData = typeof emissionsData.$inferSelect;

export type InsertResourceConsumption = z.infer<typeof insertResourceConsumptionSchema>;
export type ResourceConsumption = typeof resourceConsumption.$inferSelect;

export type InsertReport = z.infer<typeof insertReportSchema>;
export type Report = typeof reports.$inferSelect;

export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;
