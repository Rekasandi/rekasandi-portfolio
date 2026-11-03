import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, selectedServices, budget, timeline, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const payload = await getPayloadClient();

    let servicesList: string[] = [];
    if (Array.isArray(selectedServices)) {
      servicesList = selectedServices;
    } else if (typeof selectedServices === "string" && selectedServices.trim()) {
      servicesList = selectedServices.split(",").map((s) => s.trim()).filter(Boolean);
    }

    const submission = await payload.create({
      collection: "contact-submissions",
      data: {
        name,
        email,
        company: company || "",
        services: servicesList.map((s: string) => ({ service: s })),
        budget: budget || "",
        timeline: timeline || "",
        message,
        status: "new",
      },
    });

    console.log(`[Contact Submission] Saved inquiry ID: ${submission.id} from ${email}`);

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error: unknown) {
    console.error("[Contact API Error]:", error);
    const message = error instanceof Error ? error.message : "Failed to submit inquiry.";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
