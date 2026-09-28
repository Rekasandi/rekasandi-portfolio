process.env.PAYLOAD_SEEDING = 'true';
export {};
const { seedPayload } = await import('../lib/payload/seed');
await seedPayload();
