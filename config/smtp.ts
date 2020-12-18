import nodemailer from "nodemailer";
import fs from "fs";
import Handlebars from "handlebars";

import Mail from "nodemailer/lib/mailer";

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: parseInt(SMTP_PORT as string),
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  pool: true,
  maxMessages: 99,
  maxConnections: 5,
});

export interface Receiver {
  id: number;
  email: string;
  name?: string;
}

export interface MailOptions extends Mail.Options {
  template: string;
}

export const sendMail = async (receiver: Receiver, options: MailOptions) => {
  const emailTemplate = Handlebars.compile(
    fs.readFileSync(`templates/${options.template}.hbs`, "utf-8")
  );

  try {
    const info = await transporter.sendMail({
      from: options.from,
      to: receiver.email,
      subject: options.subject,
      html: emailTemplate(receiver),
    });

    console.log(`ID: ${receiver.id} - ${receiver.email} sent`);

    return info;
  } catch (err) {
    console.log(`ERROR - ID: ${receiver.id} - ${receiver.email}`);
    console.log(err);
  }
};
