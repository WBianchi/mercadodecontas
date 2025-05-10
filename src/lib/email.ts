import nodemailer from 'nodemailer';

type EmailParams = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export async function sendEmail({ to, subject, text, html }: EmailParams) {
  // Criar um transportador SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Enviar o email
  const info = await transporter.sendMail({
    from: `"Mercado de Contas" <${process.env.SMTP_FROM}>`,
    to,
    subject,
    text,
    html,
  });

  return info;
}
