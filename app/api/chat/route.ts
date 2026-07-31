import { NextResponse } from "next/server";
import { matchFaq } from "@/lib/chatbot-faq";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { message?: string };
    const message = body.message?.trim() ?? "";
    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const match = matchFaq(message);
    return NextResponse.json({
      answer: match?.answer ?? null,
      id: match?.id ?? null,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
