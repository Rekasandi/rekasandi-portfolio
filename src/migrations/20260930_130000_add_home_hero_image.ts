import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "page_home" ADD COLUMN IF NOT EXISTS "hero_image_id" integer;
    CREATE INDEX IF NOT EXISTS "page_home_hero_image_idx"
      ON "page_home" USING btree ("hero_image_id");
    DO $$ BEGIN
      ALTER TABLE "page_home" ADD CONSTRAINT "page_home_hero_image_id_media_id_fk"
        FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "page_home" DROP CONSTRAINT IF EXISTS "page_home_hero_image_id_media_id_fk";
    DROP INDEX IF EXISTS "page_home_hero_image_idx";
    ALTER TABLE "page_home" DROP COLUMN IF EXISTS "hero_image_id";
  `);
}
