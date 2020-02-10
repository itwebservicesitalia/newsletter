const nodemailer = require("nodemailer"),
  fs = require("fs"),
  Handlebars = require("handlebars");

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
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
