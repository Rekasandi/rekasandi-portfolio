import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum__locales" AS ENUM('en', 'id');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    CREATE TABLE IF NOT EXISTS "projects_locales" (
      "meta_title" varchar,
      "meta_description" varchar,
      "meta_image_id" integer,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "public"."enum__locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );
    CREATE TABLE IF NOT EXISTS "services_locales" (
      "meta_title" varchar,
      "meta_description" varchar,
      "meta_image_id" integer,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "public"."enum__locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );
    CREATE TABLE IF NOT EXISTS "posts_locales" (
      "meta_title" varchar,
      "meta_description" varchar,
      "meta_image_id" integer,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "public"."enum__locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );
    CREATE TABLE IF NOT EXISTS "site_settings_locales" (
      "meta_title" varchar,
      "meta_description" varchar,
      "meta_image_id" integer,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "public"."enum__locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );
    CREATE TABLE IF NOT EXISTS "_projects_v_locales" (
      "version_meta_title" varchar,
      "version_meta_description" varchar,
      "version_meta_image_id" integer,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "public"."enum__locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );
    CREATE TABLE IF NOT EXISTS "_services_v_locales" (
      "version_meta_title" varchar,
      "version_meta_description" varchar,
      "version_meta_image_id" integer,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "public"."enum__locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );
    CREATE TABLE IF NOT EXISTS "_posts_v_locales" (
      "version_meta_title" varchar,
      "version_meta_description" varchar,
      "version_meta_image_id" integer,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "public"."enum__locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "projects_meta_meta_image_idx" ON "projects_locales" USING btree ("meta_image_id", "_locale");
    CREATE UNIQUE INDEX IF NOT EXISTS "projects_locales_locale_parent_id_unique" ON "projects_locales" USING btree ("_locale", "_parent_id");
    CREATE INDEX IF NOT EXISTS "services_meta_meta_image_idx" ON "services_locales" USING btree ("meta_image_id", "_locale");
    CREATE UNIQUE INDEX IF NOT EXISTS "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale", "_parent_id");
    CREATE INDEX IF NOT EXISTS "posts_meta_meta_image_idx" ON "posts_locales" USING btree ("meta_image_id", "_locale");
    CREATE UNIQUE INDEX IF NOT EXISTS "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale", "_parent_id");
    CREATE INDEX IF NOT EXISTS "site_settings_meta_meta_image_idx" ON "site_settings_locales" USING btree ("meta_image_id", "_locale");
    CREATE UNIQUE INDEX IF NOT EXISTS "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale", "_parent_id");
    CREATE INDEX IF NOT EXISTS "_projects_v_version_meta_version_meta_image_idx" ON "_projects_v_locales" USING btree ("version_meta_image_id", "_locale");
    CREATE UNIQUE INDEX IF NOT EXISTS "_projects_v_locales_locale_parent_id_unique" ON "_projects_v_locales" USING btree ("_locale", "_parent_id");
    CREATE INDEX IF NOT EXISTS "_services_v_version_meta_version_meta_image_idx" ON "_services_v_locales" USING btree ("version_meta_image_id", "_locale");
    CREATE UNIQUE INDEX IF NOT EXISTS "_services_v_locales_locale_parent_id_unique" ON "_services_v_locales" USING btree ("_locale", "_parent_id");
    CREATE INDEX IF NOT EXISTS "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v_locales" USING btree ("version_meta_image_id", "_locale");
    CREATE UNIQUE INDEX IF NOT EXISTS "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale", "_parent_id");

    DO $$ BEGIN
      ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_services_v_locales" ADD CONSTRAINT "_services_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_services_v_locales" ADD CONSTRAINT "_services_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "_posts_v_locales" CASCADE;
    DROP TABLE IF EXISTS "_services_v_locales" CASCADE;
    DROP TABLE IF EXISTS "_projects_v_locales" CASCADE;
    DROP TABLE IF EXISTS "site_settings_locales" CASCADE;
    DROP TABLE IF EXISTS "posts_locales" CASCADE;
    DROP TABLE IF EXISTS "services_locales" CASCADE;
    DROP TABLE IF EXISTS "projects_locales" CASCADE;
  `)
}
