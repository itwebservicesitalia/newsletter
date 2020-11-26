import dotenv from "dotenv";

dotenv.config();

import { sendMail, MailOptions, Receiver } from "./config/smtp";

import { query } from "./config/db";

import validator from "validator";

const options: MailOptions = {
  from: '"REX.CH" <sales@rex.ch>',
  subject: "Important information to our customers",
  template: "rex16",
};

const sendBulk = async () => {
  const receivers = (await query(
    "SELECT * FROM emailprova WHERE id BETWEEN 1 AND 3"
  )) as Receiver[];

  const invalidEmails: any[] = [];

  const emailPromises: any[] = [];

  receivers.forEach((receiver: Receiver) => {
    if (validator.isEmail(receiver.email)) {
      emailPromises.push(sendMail(receiver, options));
    } else {
      invalidEmails.push([receiver.id, receiver.email]);
    }
  });

  const results = await Promise.all(emailPromises);

  console.log(`Email successfully sent: ${results.length}`);
  console.log(`Invalid emails: ${invalidEmails.length}`);

  if (invalidEmails.length != 0) {
    // Delete all emails from invalid_emails
    await query("DELETE FROM invalid_emails");

    // Insert into db invalid emails
    await query("INSERT INTO invalid_emails (id, email) VALUES ?", [
      invalidEmails,
    ]);
  }

  process.exit();
};

sendBulk();
