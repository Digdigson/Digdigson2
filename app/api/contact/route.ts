import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, TO_EMAIL } = process.env;

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ ok: false, error: 'Invalid content type' }, { status: 400 });
    }

    const { name, email, message, website } = (await req.json()) as {
      name?: string;
      email?: string;
      message?: string;
      website?: string;
    };

    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
    }

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !TO_EMAIL) {
      return NextResponse.json({ ok: false, error: 'Server misconfigured' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const html = `
      <div style="font-family:Inter,Arial,sans-serif;font-size:14px;color:#111">
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Message:</b></p>
        <pre style="white-space:pre-wrap;background:#f6f8fa;padding:12px;border-radius:8px">${escapeHtml(message)}</pre>
      </div>
    `;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${SMTP_USER}>`,
      to: TO_EMAIL,
      subject: `New message from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('contact error:', err);
    return NextResponse.json({ ok: false, error: 'Mail send failed' }, { status: 500 });
  }
}

function escapeHtml(value: string) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

