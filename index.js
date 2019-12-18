const colors = require("colors");

const sendMail = require("./config/smtp");
const mysql_query = require("./config/db");

const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const options = {
  from: '"REX.CH" <rexnewsletter@smtp.sui-inter.net>',
  subject: "Season’s greetings and best wishes for a successful 2020!",
  file: "rex14"
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const sendNewsletter = async () => {
  try {
    const receivers = await mysql_query(
      "SELECT * FROM emailtest WHERE id BETWEEN 1 AND 2"
    );

    await asyncForEach(receivers, async receiver => {
      if (regexp.test(receiver.email)) {
        const info = await sendMail(receiver, options);
        console.log(`ID: ${receiver.id}, email: ${receiver.email} SENT!`.green);
      } else {
        console.log(
          `ID: ${receiver.id}, email: ${receiver.email} INVALID!`.red
        );
      }
    });

    process.exit();
  } catch (e) {
    console.log(e);
  }
};

sendNewsletter();