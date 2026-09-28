import path from "node:path";
import { readdir } from "node:fs/promises";
import { Flyway } from "node-flyway";
import { Pool } from "pg";

const legacyMigrations = [
  ["initial_neon_schema", "1"],
  ["update_projects_upload_fields", "2"],
] as const;

function assertFlywaySuccess(
  result: { success: boolean; error?: { message?: string } },
  operation: string,
) {
  if (!result.success) {
    throw new Error(`Flyway ${operation} failed: ${result.error?.message ?? "Unknown error"}`);
  }
}

function getFlywayConfig() {
  const connectionString = process.env.DATABASE_URI;
  if (!connectionString) throw new Error("DATABASE_URI is required.");

  const databaseUrl = new URL(connectionString);
  if (!["postgres:", "postgresql:"].includes(databaseUrl.protocol)) {
    throw new Error("DATABASE_URI must be a PostgreSQL connection URL.");
  }

  const params = new URLSearchParams(databaseUrl.searchParams);
  const channelBinding = params.get("channel_binding");
  params.delete("channel_binding");
  if (channelBinding) params.set("channelBinding", channelBinding);
  const user = decodeURIComponent(databaseUrl.username || params.get("user") || "");
  const password = decodeURIComponent(databaseUrl.password || params.get("password") || "");
  params.delete("user");
  params.delete("password");
  if (!user) throw new Error("DATABASE_URI must include a database username.");

  const query = params.toString();
  const url = `jdbc:postgresql://${databaseUrl.host}${databaseUrl.pathname}${query ? `?${query}` : ""}`;

  return {
    url,
    user,
    password,
    defaultSchema: "public",
    migrationLocations: [`filesystem:${path.resolve("src/migrations")}`],
  };
}

async function baselineExistingPayloadMigrations(flyway: Flyway) {
  console.log("Checking existing migration history...");
  const pool = new Pool({ connectionString: process.env.DATABASE_URI });
  try {
    const { rows: [tables] } = await pool.query<{
      payload_migrations: string | null;
      flyway_schema_history: string | null;
    }>(`SELECT
      to_regclass('public.payload_migrations')::text AS payload_migrations,
      to_regclass('public.flyway_schema_history')::text AS flyway_schema_history`);

    if (tables.flyway_schema_history || !tables.payload_migrations) {
      console.log("No legacy Payload baseline is needed.");
      return;
    }

    const { rows } = await pool.query<{ name: string | null }>(
      `SELECT name FROM public.payload_migrations ORDER BY id`,
    );
    const appliedNames = rows
      .map(({ name }) => name)
      .filter((name): name is string => Boolean(name) && name !== "dev")
      .map((name) => name.replace(/^\d{8}_\d{6}_/, ""));
    const legacyNames = legacyMigrations.map(([name]) => name);

    if (
      appliedNames.length === 0 ||
      appliedNames.some((name, index) => name !== legacyNames[index]) ||
      appliedNames.length > legacyMigrations.length
    ) {
      throw new Error(
        "Found Payload migration history that cannot be safely baselined. Check the database schema before running Flyway.",
      );
    }

    const baselineVersion = legacyMigrations[appliedNames.length - 1][1];
    console.log(`Baselining the existing Payload schema at ${baselineVersion}...`);
    const result = await flyway.baseline({ advanced: { baselineVersion } });
    assertFlywaySuccess(result, "baseline");
    console.log(`Baselined existing Payload schema at ${baselineVersion}.`);
  } finally {
    await pool.end();
  }
}

async function migrate(flyway: Flyway) {
  console.log("Starting Flyway migration workflow...");
  await baselineExistingPayloadMigrations(flyway);
  console.log("Applying Flyway migrations...");
  const result = await flyway.migrate();
  assertFlywaySuccess(result, "migrate");
  console.dir(result.flywayResponse, { depth: null });
  console.log(
    `Flyway migrations complete (${result.flywayResponse?.migrationsExecuted ?? 0} applied in ${result.additionalDetails.executionTime} ms).`,
  );
}

async function verify(flyway: Flyway) {
  console.log("Validating Flyway migrations...");
  assertFlywaySuccess(await flyway.validate(), "validate");
  const pool = new Pool({ connectionString: process.env.DATABASE_URI });
  try {
    const { rows } = await pool.query<{ version: string; success: boolean }>(
      "SELECT version, success FROM public.flyway_schema_history WHERE version IS NOT NULL",
    );
    const applied = new Set(rows.filter(({ success }) => success).map(({ version }) => version));
    const files = await readdir(path.resolve("src/migrations"));
    const pending = files.map((file) => /^V(\d+)__.*\.sql$/.exec(file)?.[1]).filter((version): version is string => version !== undefined).filter((version) => !applied.has(version));
    if (rows.some(({ success }) => !success) || pending.length) {
      throw new Error(`Migration history is incomplete. Pending versions: ${pending.join(", ") || "none"}.`);
    }
    console.log(`Flyway migration state verified (${applied.size} applied).`);
  } finally {
    await pool.end();
  }
}

async function main() {
  const command = process.argv[2] ?? "migrate";
  console.log(`Starting Flyway database command: ${command}`);

  process.env.FLYWAY_REPORT_ENABLED = "false";
  const flyway = new Flyway(getFlywayConfig());

  if (command === "migrate") return migrate(flyway);
  if (command === "verify") return verify(flyway);
  throw new Error(`Unknown Payload database command: ${command}`);
}

main().then(() => process.exit(0)).catch((error: unknown) => {
  console.error("Payload database command failed:", error);
  process.exitCode = 1;
});
