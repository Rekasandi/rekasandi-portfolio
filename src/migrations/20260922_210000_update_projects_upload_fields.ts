import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "hero_image_id" integer;
    ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "thumbnail_image_id" integer;
    
    DO $$ BEGIN
      ALTER TABLE "projects" ADD CONSTRAINT "projects_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "projects" ADD CONSTRAINT "projects_thumbnail_image_id_media_id_fk" FOREIGN KEY ("thumbnail_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "projects_hero_image_idx" ON "projects" USING btree ("hero_image_id");
    CREATE INDEX IF NOT EXISTS "projects_thumbnail_image_idx" ON "projects" USING btree ("thumbnail_image_id");

    ALTER TABLE "projects_blocks_gallery_images" ADD COLUMN IF NOT EXISTS "image_id" integer;
    DO $$ BEGIN
      ALTER TABLE "projects_blocks_gallery_images" ADD CONSTRAINT "projects_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    CREATE INDEX IF NOT EXISTS "projects_blocks_gallery_images_image_idx" ON "projects_blocks_gallery_images" USING btree ("image_id");

    ALTER TABLE "projects_blocks_full_width_media" ADD COLUMN IF NOT EXISTS "media_id" integer;
    DO $$ BEGIN
      ALTER TABLE "projects_blocks_full_width_media" ADD CONSTRAINT "projects_blocks_full_width_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    CREATE INDEX IF NOT EXISTS "projects_blocks_full_width_media_media_idx" ON "projects_blocks_full_width_media" USING btree ("media_id");

    ALTER TABLE "projects" ALTER COLUMN "hero_image" DROP NOT NULL;
    ALTER TABLE "projects" ALTER COLUMN "thumbnail_image" DROP NOT NULL;

    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "cover_image_id" integer;
    DO $$ BEGIN
      ALTER TABLE "posts" ADD CONSTRAINT "posts_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    CREATE INDEX IF NOT EXISTS "posts_cover_image_idx" ON "posts" USING btree ("cover_image_id");
    ALTER TABLE "posts" ALTER COLUMN "cover_image" DROP NOT NULL;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_contact_submissions_status" AS ENUM('new', 'review', 'contacted', 'closed');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE TABLE IF NOT EXISTS "contact_submissions_services" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "service" varchar
    );

    CREATE TABLE IF NOT EXISTS "contact_submissions" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "email" varchar NOT NULL,
      "company" varchar,
      "budget" varchar,
      "timeline" varchar,
      "message" varchar NOT NULL,
      "status" "enum_contact_submissions_status" DEFAULT 'new',
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    DO $$ BEGIN
      ALTER TABLE "contact_submissions_services" ADD CONSTRAINT "contact_submissions_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "projects" DROP COLUMN IF EXISTS "hero_image_id";
    ALTER TABLE "projects" DROP COLUMN IF EXISTS "thumbnail_image_id";
    ALTER TABLE "projects_blocks_gallery_images" DROP COLUMN IF EXISTS "image_id";
    ALTER TABLE "projects_blocks_full_width_media" DROP COLUMN IF EXISTS "media_id";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "cover_image_id";
  `);
}
