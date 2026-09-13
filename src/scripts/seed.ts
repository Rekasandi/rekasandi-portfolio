import { seedPayload } from "../lib/payload/seed";

async function main() {
  try {
    await seedPayload();
    console.log("Seed script completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seed script failed:", err);
    process.exit(1);
  }
}

main();
