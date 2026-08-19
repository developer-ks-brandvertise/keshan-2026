import { NextResponse } from "next/server";

const QUOTE_INQUIRY_EMAIL =
  process.env.QUOTE_INQUIRY_EMAIL ?? "yash.keshan@keshanindustries.com";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
      company?: string;
      phone?: string;
      product?: string;
    };

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const message = body.message?.trim() ?? "";
    const company = body.company?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const product = body.product?.trim() ?? "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("[contact-inquiry] RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Could not send right now. Please try again later." },
        { status: 500 },
      );
    }

    const from = process.env.QUOTE_FROM_EMAIL ?? "Keshan Industries <noreply@keshanindustries.com>";
    const html = `
      <h2>New quote inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company || "—")}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || "—")}</p>
      <p><strong>Product:</strong> ${escapeHtml(product || "—")}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [QUOTE_INQUIRY_EMAIL],
        reply_to: email,
        subject: `Quote inquiry from ${name}${product ? ` — ${product}` : ""}`,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[contact-inquiry] Resend failed", res.status, detail);
      return NextResponse.json(
        { error: "Could not send right now. Please try again later." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
