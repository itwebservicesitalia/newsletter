const colors = require("colors");

const sendMail = require("./config/smtp");
const mysql_query = require("./config/db");

const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const options = {
  from: '"REX.CH" <sales@rex.ch>',
  subject: "swiss plastics, vom 21. bis 23. Januar 2020, Messe Luzern",
  file: "rex15"
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const sendNewsletter = async () => {
  try {
    const receivers = await mysql_query(
      "SELECT * FROM emailprova WHERE idemail BETWEEN 1 AND 15"
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
