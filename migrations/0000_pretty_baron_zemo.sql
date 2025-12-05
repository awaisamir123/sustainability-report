CREATE TABLE "activities" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization_id" integer,
	"activity_type" text NOT NULL,
	"description" text NOT NULL,
	"details" jsonb,
	"status" text NOT NULL,
	"user_id" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "emissions_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization_id" integer,
	"year" integer NOT NULL,
	"month" integer NOT NULL,
	"scope_1" numeric,
	"scope_2" numeric,
	"scope_3" numeric,
	"scope_1_breakdown" jsonb,
	"scope_2_breakdown" jsonb,
	"scope_3_breakdown" jsonb,
	"units" text DEFAULT 'tCO2e',
	"notes" text,
	"created_by" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"industry" text,
	"size" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization_id" integer,
	"report_name" text NOT NULL,
	"report_type" text NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"status" text DEFAULT 'draft',
	"data" jsonb,
	"created_by" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "resource_consumption" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization_id" integer,
	"year" integer NOT NULL,
	"month" integer NOT NULL,
	"resource_type" text NOT NULL,
	"amount" numeric NOT NULL,
	"units" text NOT NULL,
	"notes" text,
	"created_by" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"display_name" text,
	"role" text DEFAULT 'user',
	"email" text,
	"created_at" timestamp DEFAULT now(),
	"services_purchased" jsonb DEFAULT '[]',
	"consultations_booked" jsonb DEFAULT '[]',
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
