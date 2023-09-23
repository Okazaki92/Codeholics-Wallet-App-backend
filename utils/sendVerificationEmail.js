const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const transportOne = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.MAIL_USER,
  process.env.MAIL_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.MAIL_REFRESH_TOKEN,
});

const accessToken = oauth2Client.getAccessToken();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL,
    clientId: process.env.MAIL_USER,
    clientSecret: process.env.MAIL_SECRET,
    refreshToken: process.env.MAIL_REFRESH_TOKEN,
    accessToken: accessToken,
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

  transportOne.sendMail(emailOptions).catch((err) => console.log(err));
  transport.sendMail(emailOptions).catch((err) => console.log(err));
};

module.exports = { verificationEmail };
