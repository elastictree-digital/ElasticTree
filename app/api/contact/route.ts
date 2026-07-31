import { CONTACT_EMAIL } from "@/lib/contact";

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  message?: string;
  consent?: boolean;
};

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim();
  const company = body.company?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!body.consent) {
    return Response.json(
      { error: "Privacy consent is required to send this form." },
      { status: 400 },
    );
  }

  if (!name || !company || !email || !message) {
    return Response.json({ error: "All fields are required." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error: `Email delivery is not configured yet. Please write to ${CONTACT_EMAIL} directly.`,
      },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL ?? CONTACT_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Elastic Tree Website <onboarding@resend.dev>";

  const html = `
    <h2>New website enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Company:</strong> ${escapeHtml(company)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
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
      to: [to],
      reply_to: email,
      subject: `Website enquiry — ${name} (${company})`,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("Resend error:", detail);
    return Response.json(
      { error: "We could not send your message. Please try again or email us directly." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
