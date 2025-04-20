"use server";

// import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// const sesClient = new SESClient({
//   // region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   },
// });

// export async function sendEmail({
//   to,
//   subject,
//   message,
// }: {
//   to: string;
//   subject: string;
//   message: string;
// }) {
//   const sendEmailCommand = new SendEmailCommand({
//     Source: process.env.AWS_SOURCE_EMAIL!,
//     Destination: { ToAddresses: [to] },
//     Message: {
//       Subject: { Data: subject },
//       Body: { Text: { Data: message } },
//     },
//   });

//   try {
//     await sesClient.send(sendEmailCommand);
//   } catch (error) {
//     throw error;
//   }
// }

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
    from: process.env.AWS_SOURCE_EMAIL!,
    to: [to],
    subject: subject,
    html: message,
  });
}
