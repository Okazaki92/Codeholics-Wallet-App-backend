const nodemailer = require("nodemailer");
// const { google } = require("googleapis");
require("dotenv").config();

const transportOne = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

// const OAuth2 = google.auth.OAuth2;
// const oauth2Client = new OAuth2(
//   process.env.MAIL_USER,
//   process.env.MAIL_SECRET,
//   "https://developers.google.com/oauthplayground"
// );

// oauth2Client.setCredentials({
//   refresh_token: process.env.MAIL_REFRESH_TOKEN,
// });

// const accessToken = oauth2Client.getAccessToken();

// const transport = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: process.env.MAIL,
//     clientId: process.env.MAIL_USER,
//     clientSecret: process.env.MAIL_SECRET,
//     refreshToken: process.env.MAIL_REFRESH_TOKEN,
//     accessToken: accessToken,
//   },
// });
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

const verificationEmail = async (userEmail, verificationToken) => {
  const emailOptions = {
    from: "vincentslominski@proton.me",
    to: userEmail,
    subject: "E-mail verification",
    html: `
      <div style="text-align: center;">
        <h1>Codeholics Wallet App</h1>
        <p>Please click the link below to verify your email:</p>
        <a href="https://codeholics-wallet-app-c8b1a2de9f25.herokuapp.com/api/users/verify/${verificationToken}">
          Verify Email
        </a>
        <br>
        <div style="margin-top: 20px;">
          <img src="https://codeholics-wallet-app.netlify.app/assets/loginPage-c16fb5fa.svg" alt="Verification Image" width="200">
        </div>
      </div>
    `,
  };

  transportOne.sendMail(emailOptions).catch((err) => console.log(err));
  transport.sendMail(emailOptions).catch((err) => console.log(err));
};

module.exports = { verificationEmail };
