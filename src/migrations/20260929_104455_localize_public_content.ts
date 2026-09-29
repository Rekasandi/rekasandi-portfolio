import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"credit" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "public"."enum__locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "team_members_locales" (
  	"role" varchar NOT NULL,
  	"specialization" varchar NOT NULL,
  	"bio" varchar NOT NULL,
  	"location" varchar DEFAULT 'Jakarta, Indonesia (UTC+7)',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "public"."enum__locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "testimonials_locales" (
  	"quote" varchar NOT NULL,
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "public"."enum__locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "navigation_locales" (
  	"primary_cta_label" varchar DEFAULT 'START A PROJECT ↗',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "public"."enum__locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_locales" (
  	"statement" varchar DEFAULT 'Rekasandi is an independent digital product studio engineering category-defining applications and intelligent systems.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "public"."enum__locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_home_locales" (
  	"hero_headline_line1" varchar DEFAULT 'Digital products, built for real work.' NOT NULL,
  	"hero_subtitle" varchar DEFAULT 'We design and build websites, software, and AI systems around the way your business works.' NOT NULL,
  	"intro_title" varchar DEFAULT 'Good software starts with a clear purpose.',
  	"intro_description" varchar DEFAULT 'We make the important decisions early: what to build, who it serves, and how it should work.',
  	"intro_statement" varchar DEFAULT 'We turn complex business needs into digital products people can use with confidence.',
  	"intro_paragraph" varchar DEFAULT 'From the first product decision to the final release, our strategists, designers, and engineers work as one team. The result is software shaped around real needs, not a template or a handoff chain.',
  	"cta_headline" varchar DEFAULT 'Have a product to build?',
  	"cta_subtitle" varchar DEFAULT 'Have an ambitious digital product, web experience, or AI system in mind? We partner with companies ready to create category-defining work.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "public"."enum__locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_about_locales" (
  	"headline" varchar DEFAULT 'WE ARE REKASANDI.' NOT NULL,
  	"subheadline" varchar DEFAULT 'An independent digital product studio crafting category-defining web experiences, scalable software architectures, and autonomous AI systems.' NOT NULL,
  	"manifesto_title" varchar DEFAULT 'We care about what we build and how we build it.' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "public"."enum__locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_services_locales" (
  	"headline" varchar DEFAULT 'Services.' NOT NULL,
  	"subheadline" varchar DEFAULT 'Product strategy, design, and engineering for web, software, AI, and mobile.' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "public"."enum__locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "projects_metrics" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "projects_blocks_overview_role" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "projects_blocks_overview" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "projects_blocks_stats_items" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "projects_blocks_stats" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "projects_blocks_two_column" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "projects_blocks_quote" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "projects_blocks_tech_stack_technologies" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "projects_blocks_tech_stack" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "projects_blocks_gallery_images" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "projects_blocks_gallery" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "projects_blocks_full_width_media" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "projects_locales" ADD COLUMN "title" varchar;
  ALTER TABLE "projects_locales" ADD COLUMN "tagline" varchar;
  ALTER TABLE "projects_locales" ADD COLUMN "summary" varchar;
  ALTER TABLE "_projects_v_version_metrics" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_projects_v_blocks_overview_role" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_projects_v_blocks_overview" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_projects_v_blocks_stats_items" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_projects_v_blocks_stats" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_projects_v_blocks_two_column" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_projects_v_blocks_quote" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_projects_v_blocks_tech_stack_technologies" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_projects_v_blocks_tech_stack" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_projects_v_blocks_gallery_images" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_projects_v_blocks_gallery" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_projects_v_blocks_full_width_media" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_projects_v_locales" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_projects_v_locales" ADD COLUMN "version_tagline" varchar;
  ALTER TABLE "_projects_v_locales" ADD COLUMN "version_summary" varchar;
  ALTER TABLE "services_capabilities" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "services_deliverables" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "services_locales" ADD COLUMN "title" varchar;
  ALTER TABLE "services_locales" ADD COLUMN "short_description" varchar;
  ALTER TABLE "_services_v_version_capabilities" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_services_v_version_deliverables" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_services_v_locales" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_services_v_locales" ADD COLUMN "version_short_description" varchar;
  ALTER TABLE "posts_locales" ADD COLUMN "title" varchar;
  ALTER TABLE "posts_locales" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "posts_locales" ADD COLUMN "reading_time" varchar DEFAULT '5 min read';
  ALTER TABLE "posts_locales" ADD COLUMN "body" varchar;
  ALTER TABLE "_posts_v_locales" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_posts_v_locales" ADD COLUMN "version_excerpt" varchar;
  ALTER TABLE "_posts_v_locales" ADD COLUMN "version_reading_time" varchar DEFAULT '5 min read';
  ALTER TABLE "_posts_v_locales" ADD COLUMN "version_body" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "tagline" varchar DEFAULT 'Digital product studio for strategy, engineering, and AI systems' NOT NULL;
  ALTER TABLE "site_settings_locales" ADD COLUMN "description" varchar DEFAULT 'We design and build digital products that move businesses forward. Strategy, design, engineering, and intelligent technology based in Jakarta.';
  ALTER TABLE "site_settings_locales" ADD COLUMN "location" varchar DEFAULT 'South Jakarta, DKI Jakarta, Indonesia';
  ALTER TABLE "site_settings_locales" ADD COLUMN "availability" varchar DEFAULT 'Q2/Q3 2026 Engagement Slots Open';
  ALTER TABLE "navigation_items" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "page_home_intro_metrics" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "page_home_approach_steps" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "page_home_tech_items" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "page_about_manifesto_paragraphs" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "page_about_principles" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "page_services_engagement_models" ADD COLUMN "_locale" "public"."enum__locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members_locales" ADD CONSTRAINT "team_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_locales" ADD CONSTRAINT "testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_locales" ADD CONSTRAINT "navigation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_home_locales" ADD CONSTRAINT "page_home_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_about_locales" ADD CONSTRAINT "page_about_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_services_locales" ADD CONSTRAINT "page_services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_services"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "team_members_locales_locale_parent_id_unique" ON "team_members_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "testimonials_locales_locale_parent_id_unique" ON "testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "navigation_locales_locale_parent_id_unique" ON "navigation_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "page_home_locales_locale_parent_id_unique" ON "page_home_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "page_about_locales_locale_parent_id_unique" ON "page_about_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "page_services_locales_locale_parent_id_unique" ON "page_services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_metrics_locale_idx" ON "projects_metrics" USING btree ("_locale");
  CREATE INDEX "projects_blocks_overview_role_locale_idx" ON "projects_blocks_overview_role" USING btree ("_locale");
  CREATE INDEX "projects_blocks_overview_locale_idx" ON "projects_blocks_overview" USING btree ("_locale");
  CREATE INDEX "projects_blocks_stats_items_locale_idx" ON "projects_blocks_stats_items" USING btree ("_locale");
  CREATE INDEX "projects_blocks_stats_locale_idx" ON "projects_blocks_stats" USING btree ("_locale");
  CREATE INDEX "projects_blocks_two_column_locale_idx" ON "projects_blocks_two_column" USING btree ("_locale");
  CREATE INDEX "projects_blocks_quote_locale_idx" ON "projects_blocks_quote" USING btree ("_locale");
  CREATE INDEX "projects_blocks_tech_stack_technologies_locale_idx" ON "projects_blocks_tech_stack_technologies" USING btree ("_locale");
  CREATE INDEX "projects_blocks_tech_stack_locale_idx" ON "projects_blocks_tech_stack" USING btree ("_locale");
  CREATE INDEX "projects_blocks_gallery_images_locale_idx" ON "projects_blocks_gallery_images" USING btree ("_locale");
  CREATE INDEX "projects_blocks_gallery_locale_idx" ON "projects_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "projects_blocks_full_width_media_locale_idx" ON "projects_blocks_full_width_media" USING btree ("_locale");
  CREATE INDEX "_projects_v_version_metrics_locale_idx" ON "_projects_v_version_metrics" USING btree ("_locale");
  CREATE INDEX "_projects_v_blocks_overview_role_locale_idx" ON "_projects_v_blocks_overview_role" USING btree ("_locale");
  CREATE INDEX "_projects_v_blocks_overview_locale_idx" ON "_projects_v_blocks_overview" USING btree ("_locale");
  CREATE INDEX "_projects_v_blocks_stats_items_locale_idx" ON "_projects_v_blocks_stats_items" USING btree ("_locale");
  CREATE INDEX "_projects_v_blocks_stats_locale_idx" ON "_projects_v_blocks_stats" USING btree ("_locale");
  CREATE INDEX "_projects_v_blocks_two_column_locale_idx" ON "_projects_v_blocks_two_column" USING btree ("_locale");
  CREATE INDEX "_projects_v_blocks_quote_locale_idx" ON "_projects_v_blocks_quote" USING btree ("_locale");
  CREATE INDEX "_projects_v_blocks_tech_stack_technologies_locale_idx" ON "_projects_v_blocks_tech_stack_technologies" USING btree ("_locale");
  CREATE INDEX "_projects_v_blocks_tech_stack_locale_idx" ON "_projects_v_blocks_tech_stack" USING btree ("_locale");
  CREATE INDEX "_projects_v_blocks_gallery_images_locale_idx" ON "_projects_v_blocks_gallery_images" USING btree ("_locale");
  CREATE INDEX "_projects_v_blocks_gallery_locale_idx" ON "_projects_v_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "_projects_v_blocks_full_width_media_locale_idx" ON "_projects_v_blocks_full_width_media" USING btree ("_locale");
  CREATE INDEX "services_capabilities_locale_idx" ON "services_capabilities" USING btree ("_locale");
  CREATE INDEX "services_deliverables_locale_idx" ON "services_deliverables" USING btree ("_locale");
  CREATE INDEX "_services_v_version_capabilities_locale_idx" ON "_services_v_version_capabilities" USING btree ("_locale");
  CREATE INDEX "_services_v_version_deliverables_locale_idx" ON "_services_v_version_deliverables" USING btree ("_locale");
  CREATE INDEX "navigation_items_locale_idx" ON "navigation_items" USING btree ("_locale");
  CREATE INDEX "page_home_intro_metrics_locale_idx" ON "page_home_intro_metrics" USING btree ("_locale");
  CREATE INDEX "page_home_approach_steps_locale_idx" ON "page_home_approach_steps" USING btree ("_locale");
  CREATE INDEX "page_home_tech_items_locale_idx" ON "page_home_tech_items" USING btree ("_locale");
  CREATE INDEX "page_about_manifesto_paragraphs_locale_idx" ON "page_about_manifesto_paragraphs" USING btree ("_locale");
  CREATE INDEX "page_about_principles_locale_idx" ON "page_about_principles" USING btree ("_locale");
  CREATE INDEX "page_services_engagement_models_locale_idx" ON "page_services_engagement_models" USING btree ("_locale");
  INSERT INTO "media_locales" ("_locale", "_parent_id", "alt", "caption", "credit")
  SELECT 'en', "id", COALESCE("alt", ''), "caption", "credit" FROM "media"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "alt" = EXCLUDED."alt", "caption" = EXCLUDED."caption", "credit" = EXCLUDED."credit";

  INSERT INTO "projects_locales" ("_locale", "_parent_id", "title", "tagline", "summary")
  SELECT 'en', "id", "title", "tagline", "summary" FROM "projects"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "title" = EXCLUDED."title", "tagline" = EXCLUDED."tagline", "summary" = EXCLUDED."summary";

  INSERT INTO "services_locales" ("_locale", "_parent_id", "title", "short_description")
  SELECT 'en', "id", "title", "short_description" FROM "services"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "title" = EXCLUDED."title", "short_description" = EXCLUDED."short_description";

  INSERT INTO "posts_locales" ("_locale", "_parent_id", "title", "excerpt", "reading_time", "body")
  SELECT 'en', "id", "title", "excerpt", "reading_time", "body" FROM "posts"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "title" = EXCLUDED."title", "excerpt" = EXCLUDED."excerpt", "reading_time" = EXCLUDED."reading_time", "body" = EXCLUDED."body";

  INSERT INTO "team_members_locales" ("_locale", "_parent_id", "role", "specialization", "bio", "location")
  SELECT 'en', "id", "role", "specialization", "bio", "location" FROM "team_members";

  INSERT INTO "testimonials_locales" ("_locale", "_parent_id", "quote", "role")
  SELECT 'en', "id", COALESCE("quote", ''), "role" FROM "testimonials";

  INSERT INTO "site_settings_locales" ("_locale", "_parent_id", "tagline", "description", "location", "availability")
  SELECT 'en', "id", "tagline", "description", "location", "availability" FROM "site_settings"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "tagline" = EXCLUDED."tagline", "description" = EXCLUDED."description", "location" = EXCLUDED."location", "availability" = EXCLUDED."availability";

  INSERT INTO "navigation_locales" ("_locale", "_parent_id", "primary_cta_label")
  SELECT 'en', "id", "primary_cta_label" FROM "navigation";

  INSERT INTO "footer_locales" ("_locale", "_parent_id", "statement")
  SELECT 'en', "id", "statement" FROM "footer";

  INSERT INTO "page_home_locales" ("_locale", "_parent_id", "hero_headline_line1", "hero_subtitle", "intro_title", "intro_description", "intro_statement", "intro_paragraph", "cta_headline", "cta_subtitle")
  SELECT 'en', "id", "hero_headline_line1", "hero_subtitle", "intro_title", "intro_description", "intro_statement", "intro_paragraph", "cta_headline", "cta_subtitle" FROM "page_home";

  INSERT INTO "page_about_locales" ("_locale", "_parent_id", "headline", "subheadline", "manifesto_title")
  SELECT 'en', "id", "headline", "subheadline", "manifesto_title" FROM "page_about";

  INSERT INTO "page_services_locales" ("_locale", "_parent_id", "headline", "subheadline")
  SELECT 'en', "id", "headline", "subheadline" FROM "page_services";

  ALTER TABLE "media" DROP COLUMN "alt";
  ALTER TABLE "media" DROP COLUMN "caption";
  ALTER TABLE "media" DROP COLUMN "credit";
  ALTER TABLE "projects" DROP COLUMN "title";
  ALTER TABLE "projects" DROP COLUMN "tagline";
  ALTER TABLE "projects" DROP COLUMN "summary";
  ALTER TABLE "_projects_v" DROP COLUMN "version_title";
  ALTER TABLE "_projects_v" DROP COLUMN "version_tagline";
  ALTER TABLE "_projects_v" DROP COLUMN "version_summary";
  ALTER TABLE "services" DROP COLUMN "title";
  ALTER TABLE "services" DROP COLUMN "short_description";
  ALTER TABLE "_services_v" DROP COLUMN "version_title";
  ALTER TABLE "_services_v" DROP COLUMN "version_short_description";
  ALTER TABLE "posts" DROP COLUMN "title";
  ALTER TABLE "posts" DROP COLUMN "excerpt";
  ALTER TABLE "posts" DROP COLUMN "reading_time";
  ALTER TABLE "posts" DROP COLUMN "body";
  ALTER TABLE "_posts_v" DROP COLUMN "version_title";
  ALTER TABLE "_posts_v" DROP COLUMN "version_excerpt";
  ALTER TABLE "_posts_v" DROP COLUMN "version_reading_time";
  ALTER TABLE "_posts_v" DROP COLUMN "version_body";
  ALTER TABLE "team_members" DROP COLUMN "role";
  ALTER TABLE "team_members" DROP COLUMN "specialization";
  ALTER TABLE "team_members" DROP COLUMN "bio";
  ALTER TABLE "team_members" DROP COLUMN "location";
  ALTER TABLE "testimonials" DROP COLUMN "quote";
  ALTER TABLE "testimonials" DROP COLUMN "role";
  ALTER TABLE "site_settings" DROP COLUMN "tagline";
  ALTER TABLE "site_settings" DROP COLUMN "description";
  ALTER TABLE "site_settings" DROP COLUMN "location";
  ALTER TABLE "site_settings" DROP COLUMN "availability";
  ALTER TABLE "navigation" DROP COLUMN "primary_cta_label";
  ALTER TABLE "footer" DROP COLUMN "statement";
  ALTER TABLE "page_home" DROP COLUMN "hero_headline_line1";
  ALTER TABLE "page_home" DROP COLUMN "hero_subtitle";
  ALTER TABLE "page_home" DROP COLUMN "intro_title";
  ALTER TABLE "page_home" DROP COLUMN "intro_description";
  ALTER TABLE "page_home" DROP COLUMN "intro_statement";
  ALTER TABLE "page_home" DROP COLUMN "intro_paragraph";
  ALTER TABLE "page_home" DROP COLUMN "cta_headline";
  ALTER TABLE "page_home" DROP COLUMN "cta_subtitle";
  ALTER TABLE "page_about" DROP COLUMN "headline";
  ALTER TABLE "page_about" DROP COLUMN "subheadline";
  ALTER TABLE "page_about" DROP COLUMN "manifesto_title";
  ALTER TABLE "page_services" DROP COLUMN "headline";
  ALTER TABLE "page_services" DROP COLUMN "subheadline";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_members_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_home_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_about_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_services_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "team_members_locales" CASCADE;
  DROP TABLE "testimonials_locales" CASCADE;
  DROP TABLE "navigation_locales" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "page_home_locales" CASCADE;
  DROP TABLE "page_about_locales" CASCADE;
  DROP TABLE "page_services_locales" CASCADE;
  DROP INDEX "projects_metrics_locale_idx";
  DROP INDEX "projects_blocks_overview_role_locale_idx";
  DROP INDEX "projects_blocks_overview_locale_idx";
  DROP INDEX "projects_blocks_stats_items_locale_idx";
  DROP INDEX "projects_blocks_stats_locale_idx";
  DROP INDEX "projects_blocks_two_column_locale_idx";
  DROP INDEX "projects_blocks_quote_locale_idx";
  DROP INDEX "projects_blocks_tech_stack_technologies_locale_idx";
  DROP INDEX "projects_blocks_tech_stack_locale_idx";
  DROP INDEX "projects_blocks_gallery_images_locale_idx";
  DROP INDEX "projects_blocks_gallery_locale_idx";
  DROP INDEX "projects_blocks_full_width_media_locale_idx";
  DROP INDEX "_projects_v_version_metrics_locale_idx";
  DROP INDEX "_projects_v_blocks_overview_role_locale_idx";
  DROP INDEX "_projects_v_blocks_overview_locale_idx";
  DROP INDEX "_projects_v_blocks_stats_items_locale_idx";
  DROP INDEX "_projects_v_blocks_stats_locale_idx";
  DROP INDEX "_projects_v_blocks_two_column_locale_idx";
  DROP INDEX "_projects_v_blocks_quote_locale_idx";
  DROP INDEX "_projects_v_blocks_tech_stack_technologies_locale_idx";
  DROP INDEX "_projects_v_blocks_tech_stack_locale_idx";
  DROP INDEX "_projects_v_blocks_gallery_images_locale_idx";
  DROP INDEX "_projects_v_blocks_gallery_locale_idx";
  DROP INDEX "_projects_v_blocks_full_width_media_locale_idx";
  DROP INDEX "services_capabilities_locale_idx";
  DROP INDEX "services_deliverables_locale_idx";
  DROP INDEX "_services_v_version_capabilities_locale_idx";
  DROP INDEX "_services_v_version_deliverables_locale_idx";
  DROP INDEX "navigation_items_locale_idx";
  DROP INDEX "page_home_intro_metrics_locale_idx";
  DROP INDEX "page_home_approach_steps_locale_idx";
  DROP INDEX "page_home_tech_items_locale_idx";
  DROP INDEX "page_about_manifesto_paragraphs_locale_idx";
  DROP INDEX "page_about_principles_locale_idx";
  DROP INDEX "page_services_engagement_models_locale_idx";
  ALTER TABLE "media" ADD COLUMN "alt" varchar NOT NULL;
  ALTER TABLE "media" ADD COLUMN "caption" varchar;
  ALTER TABLE "media" ADD COLUMN "credit" varchar;
  ALTER TABLE "projects" ADD COLUMN "title" varchar;
  ALTER TABLE "projects" ADD COLUMN "tagline" varchar;
  ALTER TABLE "projects" ADD COLUMN "summary" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_tagline" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_summary" varchar;
  ALTER TABLE "services" ADD COLUMN "title" varchar;
  ALTER TABLE "services" ADD COLUMN "short_description" varchar;
  ALTER TABLE "_services_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_services_v" ADD COLUMN "version_short_description" varchar;
  ALTER TABLE "posts" ADD COLUMN "title" varchar;
  ALTER TABLE "posts" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "posts" ADD COLUMN "reading_time" varchar DEFAULT '5 min read';
  ALTER TABLE "posts" ADD COLUMN "body" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_excerpt" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_reading_time" varchar DEFAULT '5 min read';
  ALTER TABLE "_posts_v" ADD COLUMN "version_body" varchar;
  ALTER TABLE "team_members" ADD COLUMN "role" varchar NOT NULL;
  ALTER TABLE "team_members" ADD COLUMN "specialization" varchar NOT NULL;
  ALTER TABLE "team_members" ADD COLUMN "bio" varchar NOT NULL;
  ALTER TABLE "team_members" ADD COLUMN "location" varchar DEFAULT 'Jakarta, Indonesia (UTC+7)';
  ALTER TABLE "testimonials" ADD COLUMN "quote" varchar NOT NULL;
  ALTER TABLE "testimonials" ADD COLUMN "role" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "tagline" varchar DEFAULT 'Digital product studio for strategy, engineering, and AI systems' NOT NULL;
  ALTER TABLE "site_settings" ADD COLUMN "description" varchar DEFAULT 'We design and build digital products that move businesses forward. Strategy, design, engineering, and intelligent technology based in Jakarta.';
  ALTER TABLE "site_settings" ADD COLUMN "location" varchar DEFAULT 'South Jakarta, DKI Jakarta, Indonesia';
  ALTER TABLE "site_settings" ADD COLUMN "availability" varchar DEFAULT 'Q2/Q3 2026 Engagement Slots Open';
  ALTER TABLE "navigation" ADD COLUMN "primary_cta_label" varchar DEFAULT 'START A PROJECT ↗';
  ALTER TABLE "footer" ADD COLUMN "statement" varchar DEFAULT 'Rekasandi is an independent digital product studio engineering category-defining applications and intelligent systems.';
  ALTER TABLE "page_home" ADD COLUMN "hero_headline_line1" varchar DEFAULT 'Digital products, built for real work.' NOT NULL;
  ALTER TABLE "page_home" ADD COLUMN "hero_subtitle" varchar DEFAULT 'We design and build websites, software, and AI systems around the way your business works.' NOT NULL;
  ALTER TABLE "page_home" ADD COLUMN "intro_title" varchar DEFAULT 'Good software starts with a clear purpose.';
  ALTER TABLE "page_home" ADD COLUMN "intro_description" varchar DEFAULT 'We make the important decisions early: what to build, who it serves, and how it should work.';
  ALTER TABLE "page_home" ADD COLUMN "intro_statement" varchar DEFAULT 'We turn complex business needs into digital products people can use with confidence.';
  ALTER TABLE "page_home" ADD COLUMN "intro_paragraph" varchar DEFAULT 'From the first product decision to the final release, our strategists, designers, and engineers work as one team. The result is software shaped around real needs, not a template or a handoff chain.';
  ALTER TABLE "page_home" ADD COLUMN "cta_headline" varchar DEFAULT 'Have a product to build?';
  ALTER TABLE "page_home" ADD COLUMN "cta_subtitle" varchar DEFAULT 'Have an ambitious digital product, web experience, or AI system in mind? We partner with companies ready to create category-defining work.';
  ALTER TABLE "page_about" ADD COLUMN "headline" varchar DEFAULT 'WE ARE REKASANDI.' NOT NULL;
  ALTER TABLE "page_about" ADD COLUMN "subheadline" varchar DEFAULT 'An independent digital product studio crafting category-defining web experiences, scalable software architectures, and autonomous AI systems.' NOT NULL;
  ALTER TABLE "page_about" ADD COLUMN "manifesto_title" varchar DEFAULT 'We care about what we build and how we build it.' NOT NULL;
  ALTER TABLE "page_services" ADD COLUMN "headline" varchar DEFAULT 'Services.' NOT NULL;
  ALTER TABLE "page_services" ADD COLUMN "subheadline" varchar DEFAULT 'Product strategy, design, and engineering for web, software, AI, and mobile.' NOT NULL;
  ALTER TABLE "projects_metrics" DROP COLUMN "_locale";
  ALTER TABLE "projects_blocks_overview_role" DROP COLUMN "_locale";
  ALTER TABLE "projects_blocks_overview" DROP COLUMN "_locale";
  ALTER TABLE "projects_blocks_stats_items" DROP COLUMN "_locale";
  ALTER TABLE "projects_blocks_stats" DROP COLUMN "_locale";
  ALTER TABLE "projects_blocks_two_column" DROP COLUMN "_locale";
  ALTER TABLE "projects_blocks_quote" DROP COLUMN "_locale";
  ALTER TABLE "projects_blocks_tech_stack_technologies" DROP COLUMN "_locale";
  ALTER TABLE "projects_blocks_tech_stack" DROP COLUMN "_locale";
  ALTER TABLE "projects_blocks_gallery_images" DROP COLUMN "_locale";
  ALTER TABLE "projects_blocks_gallery" DROP COLUMN "_locale";
  ALTER TABLE "projects_blocks_full_width_media" DROP COLUMN "_locale";
  ALTER TABLE "projects_locales" DROP COLUMN "title";
  ALTER TABLE "projects_locales" DROP COLUMN "tagline";
  ALTER TABLE "projects_locales" DROP COLUMN "summary";
  ALTER TABLE "_projects_v_version_metrics" DROP COLUMN "_locale";
  ALTER TABLE "_projects_v_blocks_overview_role" DROP COLUMN "_locale";
  ALTER TABLE "_projects_v_blocks_overview" DROP COLUMN "_locale";
  ALTER TABLE "_projects_v_blocks_stats_items" DROP COLUMN "_locale";
  ALTER TABLE "_projects_v_blocks_stats" DROP COLUMN "_locale";
  ALTER TABLE "_projects_v_blocks_two_column" DROP COLUMN "_locale";
  ALTER TABLE "_projects_v_blocks_quote" DROP COLUMN "_locale";
  ALTER TABLE "_projects_v_blocks_tech_stack_technologies" DROP COLUMN "_locale";
  ALTER TABLE "_projects_v_blocks_tech_stack" DROP COLUMN "_locale";
  ALTER TABLE "_projects_v_blocks_gallery_images" DROP COLUMN "_locale";
  ALTER TABLE "_projects_v_blocks_gallery" DROP COLUMN "_locale";
  ALTER TABLE "_projects_v_blocks_full_width_media" DROP COLUMN "_locale";
  ALTER TABLE "_projects_v_locales" DROP COLUMN "version_title";
  ALTER TABLE "_projects_v_locales" DROP COLUMN "version_tagline";
  ALTER TABLE "_projects_v_locales" DROP COLUMN "version_summary";
  ALTER TABLE "services_capabilities" DROP COLUMN "_locale";
  ALTER TABLE "services_deliverables" DROP COLUMN "_locale";
  ALTER TABLE "services_locales" DROP COLUMN "title";
  ALTER TABLE "services_locales" DROP COLUMN "short_description";
  ALTER TABLE "_services_v_version_capabilities" DROP COLUMN "_locale";
  ALTER TABLE "_services_v_version_deliverables" DROP COLUMN "_locale";
  ALTER TABLE "_services_v_locales" DROP COLUMN "version_title";
  ALTER TABLE "_services_v_locales" DROP COLUMN "version_short_description";
  ALTER TABLE "posts_locales" DROP COLUMN "title";
  ALTER TABLE "posts_locales" DROP COLUMN "excerpt";
  ALTER TABLE "posts_locales" DROP COLUMN "reading_time";
  ALTER TABLE "posts_locales" DROP COLUMN "body";
  ALTER TABLE "_posts_v_locales" DROP COLUMN "version_title";
  ALTER TABLE "_posts_v_locales" DROP COLUMN "version_excerpt";
  ALTER TABLE "_posts_v_locales" DROP COLUMN "version_reading_time";
  ALTER TABLE "_posts_v_locales" DROP COLUMN "version_body";
  ALTER TABLE "site_settings_locales" DROP COLUMN "tagline";
  ALTER TABLE "site_settings_locales" DROP COLUMN "description";
  ALTER TABLE "site_settings_locales" DROP COLUMN "location";
  ALTER TABLE "site_settings_locales" DROP COLUMN "availability";
  ALTER TABLE "navigation_items" DROP COLUMN "_locale";
  ALTER TABLE "page_home_intro_metrics" DROP COLUMN "_locale";
  ALTER TABLE "page_home_approach_steps" DROP COLUMN "_locale";
  ALTER TABLE "page_home_tech_items" DROP COLUMN "_locale";
  ALTER TABLE "page_about_manifesto_paragraphs" DROP COLUMN "_locale";
  ALTER TABLE "page_about_principles" DROP COLUMN "_locale";
  ALTER TABLE "page_services_engagement_models" DROP COLUMN "_locale";`)
}
