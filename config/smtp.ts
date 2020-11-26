import nodemailer from "nodemailer";
import fs from "fs";
import Handlebars from "handlebars";
import Mail from "nodemailer/lib/mailer";

const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  pool: true,
  maxConnections: 50,
  maxMessages: 2000,
});

export interface Receiver {
  id: number;
  email: string;
  name?: string;
}

export interface MailOptions extends Mail.Options {
  template: string;
}

export const sendMail = (receiver: Receiver, options: MailOptions) => {
  const emailTemplate = Handlebars.compile(
    fs.readFileSync(`templates/${options.template}.hbs`, "utf-8")
  );

  console.log(`ID: ${receiver.id} - ${receiver.email} sent`);

  return transporter.sendMail({
    from: options.from,
    to: receiver.email,
    subject: options.subject,
    html: emailTemplate(receiver),
  });
};
