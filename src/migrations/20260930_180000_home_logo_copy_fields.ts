import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";
import { up as ensureLogoTables } from "./20260930_170000_home_logo_arrays";

export async function up(args: MigrateUpArgs): Promise<void> {
  await ensureLogoTables(args);
  await args.db.execute(sql`
    ALTER TABLE "page_home_locales"
      ADD COLUMN IF NOT EXISTS "client_eyebrow" varchar,
      ADD COLUMN IF NOT EXISTS "client_heading" varchar,
      ADD COLUMN IF NOT EXISTS "tech_eyebrow" varchar,
      ADD COLUMN IF NOT EXISTS "tech_heading" varchar,
      ADD COLUMN IF NOT EXISTS "tech_description" varchar;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "page_home_locales"
      DROP COLUMN IF EXISTS "client_eyebrow",
      DROP COLUMN IF EXISTS "client_heading",
      DROP COLUMN IF EXISTS "tech_eyebrow",
      DROP COLUMN IF EXISTS "tech_heading",
      DROP COLUMN IF EXISTS "tech_description";
  `);
}
