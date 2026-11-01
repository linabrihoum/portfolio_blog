import siteMetadata from "@/src/utils/siteMetaData";
import { validateContact } from "@/src/utils/contact";

const RESEND_URL = "https://api.resend.com/emails";

// Resend's shared test sender. Without a verified domain it can only deliver
// to the Resend account's own address, which is siteMetadata.email.
const FROM = "Portfolio Contact Form <onboarding@resend.dev>";

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: real visitors never see this field, so only bots fill it in.
  // Pretend it worked so they don't retry.
  if (data?.website) {
    return Response.json({ ok: true });
  }

  const errors = validateContact(data);
  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set");
    return Response.json({ error: "Email is not configured" }, { status: 500 });
  }

  const name = data.name.trim();
  const email = data.email.trim();
  const message = data.message.trim();

  try {
    const response = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [siteMetadata.email],
        reply_to: email,
        subject: `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!response.ok) {
      console.error("Contact form: Resend returned", response.status, await response.text());
      return Response.json({ error: "Could not send message" }, { status: 502 });
    }
  } catch (error) {
    console.error("Contact form: could not reach Resend", error);
    return Response.json({ error: "Could not send message" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
