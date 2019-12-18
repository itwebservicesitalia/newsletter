const nodemailer = require("nodemailer"),
  fs = require("fs"),
  Handlebars = require("handlebars");

const transporter = nodemailer.createTransport({
  host: "smtp.sui-inter.net",
  port: 465,
  secure: true,
  auth: {
    user: "wed-usa.com@smtp.sui-inter.net",
    pass: "DER85rdRsee"
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
