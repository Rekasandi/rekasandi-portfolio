import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "team_members"
      ADD COLUMN IF NOT EXISTS "photo_id" integer;
    CREATE INDEX IF NOT EXISTS "team_members_photo_idx"
      ON "team_members" USING btree ("photo_id");
    DO $$ BEGIN
      ALTER TABLE "team_members"
        ADD CONSTRAINT "team_members_photo_id_media_id_fk"
        FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "team_members"
      DROP CONSTRAINT IF EXISTS "team_members_photo_id_media_id_fk";
    DROP INDEX IF EXISTS "team_members_photo_idx";
    ALTER TABLE "team_members"
      DROP COLUMN IF EXISTS "photo_id";
  `);
}
