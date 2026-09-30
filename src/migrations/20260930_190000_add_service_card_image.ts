import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "services"
      ADD COLUMN IF NOT EXISTS "card_image_id" integer;
    CREATE INDEX IF NOT EXISTS "services_card_image_idx"
      ON "services" USING btree ("card_image_id");
    DO $$ BEGIN
      ALTER TABLE "services"
        ADD CONSTRAINT "services_card_image_id_media_id_fk"
        FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    ALTER TABLE "_services_v"
      ADD COLUMN IF NOT EXISTS "version_card_image_id" integer;
    CREATE INDEX IF NOT EXISTS "_services_v_version_version_card_image_idx"
      ON "_services_v" USING btree ("version_card_image_id");
    DO $$ BEGIN
      ALTER TABLE "_services_v"
        ADD CONSTRAINT "_services_v_version_card_image_id_media_id_fk"
        FOREIGN KEY ("version_card_image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "_services_v"
      DROP CONSTRAINT IF EXISTS "_services_v_version_card_image_id_media_id_fk";
    DROP INDEX IF EXISTS "_services_v_version_version_card_image_idx";
    ALTER TABLE "_services_v"
      DROP COLUMN IF EXISTS "version_card_image_id";

    ALTER TABLE "services"
      DROP CONSTRAINT IF EXISTS "services_card_image_id_media_id_fk";
    DROP INDEX IF EXISTS "services_card_image_idx";
    ALTER TABLE "services"
      DROP COLUMN IF EXISTS "card_image_id";
  `);
}
