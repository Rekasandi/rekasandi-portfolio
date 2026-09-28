import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid contact form data." }, { status: 400 });
    }
    const { name, email, company, selectedServices, budget, timeline, message } = body;

    if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !email.trim() || typeof message !== "string" || !message.trim() || (selectedServices !== undefined && (!Array.isArray(selectedServices) || !selectedServices.every((service) => typeof service === "string")))) {
      return NextResponse.json(
        { error: "Invalid contact form data." },
        { status: 400 }
      );
    }

    const payload = await getPayloadClient();

    const submission = await payload.create({
      collection: "contact-submissions",
      data: {
        name: name.trim(),
        email: email.trim(),
        company: typeof company === "string" ? company : "",
        services: (selectedServices || []).map((service: string) => ({ service })),
        budget: typeof budget === "string" ? budget : "",
        timeline: typeof timeline === "string" ? timeline : "",
        message: message.trim(),
        status: "new",
      },
    });

    console.log(`[Contact Submission] Saved inquiry ID: ${submission.id} from ${email}`);

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry." },
      { status: 500 }
    );
  }
}
