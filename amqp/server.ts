import smtp from "smtp-server";
import config from "./config";

const smtpServer = new smtp.SMTPServer({
  logger: false,
  banner: "Welcome to SMTP server",
  size: 10 * 1024 * 1024,
  disabledCommands: ["STARTTLS"],

  onAuth: (auth, session, callback) => {
    return callback(null, {
      user: auth.username,
    });
  },

  onData: (stream, session, callback) => {
    console.log(`Streaming message ${session.clientHostname}`);
    console.log("------------------");
    stream.pipe(process.stdout);
    stream.on("end", () => {
      console.log(""); // ensure linebreak after the message
      callback();
    });
  },
});

smtpServer.on("error", (err) => {
  console.log("Error occurred");
  console.log(err);
});

// start listening
smtpServer.listen(config.smtp.port, config.smtp.host);
