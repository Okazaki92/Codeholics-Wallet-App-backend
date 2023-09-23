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
    html: `Please copy the link to verify your email: http://localhost:3000/api/users/verify/${verificationToken}`,
  };

  transport.sendMail(emailOptions).catch((err) => console.log(err));
};

module.exports = { verificationEmail };
