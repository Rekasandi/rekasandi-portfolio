import { seedIndonesianContent } from "../lib/payload/seed-locales";
import { getPayloadClient } from "../lib/payload/client";

async function main() {
  const payload = await getPayloadClient();
  await seedIndonesianContent(payload);
  process.exit(0);
}

main().catch((error) => {
  console.error("Localized content seed failed:", error);
  process.exit(1);
});
