import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  (await draftMode()).disable();
  return NextResponse.redirect(new URL("/insights", request.url), 303);
}
