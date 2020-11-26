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
    "SELECT * FROM email WHERE id BETWEEN 1 AND 100"
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
    /**
 * If fulfilled
 * {
      status: 'fulfilled',
      value: {
        accepted: [Array],
        rejected: [],
        envelopeTime: 139,
        messageTime: 64,
        messageSize: 2112,
        response: '250 Accepted [STATUS=new MSGID=X7--vHOUYS42YaxIX7.CCEBf5S6uTMiYAAAQSBI2C7DJX9p9OmRCDSoZ2fQ]',
        envelope: [Object],
        messageId: '<ec482ab3-2433-6942-28ab-f3ae7b376b03@rex.ch>'
      }
    }
    If rejected
    {
    status: 'rejected',
    reason: Error: queryA ETIMEOUT smtp.ethereal.email
        at QueryReqWrap.onresolve [as oncomplete] (node:dns:203:19) {
      errno: undefined,
      code: 'EDNS',
      syscall: 'queryA',
      hostname: 'smtp.ethereal.email',
      command: 'CONN'
    }
  }
 */

    console.log(results);
  } catch (err) {
    console.log(err);
  }

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
