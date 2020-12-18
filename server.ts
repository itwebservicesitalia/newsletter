import dotenv from "dotenv";

dotenv.config();

import { sendMail, MailOptions, Receiver } from "./config/smtp";

import { query } from "./config/db";

import validator from "validator";

const options: MailOptions = {
  from: '"REX.CH" <sales@rex.ch>',
  subject: "Important information to our customers",
  template: "rex17",
};

const TABLE_NAME = "email17";

const sendBulk = async () => {
  const receivers = (await query(
    `SELECT * FROM ${TABLE_NAME} WHERE id BETWEEN 2950 AND 3049`
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

  let results = [];

  try {
    results = await Promise.allSettled(emailPromises);
  } catch (err) {
    console.log(err);
  }

  console.log(`Email successfully sent: ${results.length}`);
  console.log(`Invalid emails: ${invalidEmails.length}`);

  if (invalidEmails.length != 0) {
    await query(
      `CREATE TABLE IF NOT EXISTS invalid_emails (
        id INT NOT NULL AUTO_INCREMENT, 
        email TEXT NOT NULL,
        PRIMARY KEY (id)
      )`
    );

    // Insert into db invalid emails
    await query(
      "INSERT INTO invalid_emails (id, email) VALUES ? ON DUPLICATE KEY UPDATE email=email",
      [invalidEmails]
    );
  }

  process.exit();
};

sendBulk();
