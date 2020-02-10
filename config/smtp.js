const nodemailer = require("nodemailer"),
  fs = require("fs"),
  Handlebars = require("handlebars");

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: {
<<<<<<< HEAD
    user: SMTP_USER,
    pass: SMTP_PASS
  }
=======
    user: "wed-usa.com@smtp.sui-inter.net",
    pass: "DER85rdRsee"
  },
  pool: true,
  maxMessages: Infinity,
  maxConnections: 20
>>>>>>> 0e341f08ad23d9a493f7ddc2244006ae6a1d6dc2
});

async function sendMail(receiver, options) {
  const emailTemplate = Handlebars.compile(
    fs.readFileSync(`templates/${options.file}.hbs`, "utf-8")
  );

  const info = await transporter.sendMail({
    from: options.from,
    to: receiver.email,
    subject: options.subject,
    html: emailTemplate(receiver)
  });

  return info;
}

module.exports = sendMail;
