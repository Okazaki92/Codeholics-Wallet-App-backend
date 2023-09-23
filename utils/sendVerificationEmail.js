const nodemailer = require("nodemailer");
require("dotenv").config();

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const verificationEmail = async (userEmail, verificationToken) => {
  const emailOptions = {
    from: "vincentslominski@proton.me",
    to: userEmail,
    subject: "E-mail verification",
    html: `
      <p>Please click the link below to verify your email:</p>
      <a href="https://codeholics-wallet-app-c8b1a2de9f25.herokuapp.com/api/users/verify/${verificationToken}">
        Verify Email
      </a>
    `,
  };

  transport.sendMail(emailOptions).catch((err) => console.log(err));
};

module.exports = { verificationEmail };
