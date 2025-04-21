"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  message,
}: {
  to: string;
  subject: string;
  message: string;
}) {
  await resend.emails.send({
    from: process.env.RESEND_SOURCE_EMAIL!,
    to: [to],
    subject: subject,
    html: message,
  });
}
