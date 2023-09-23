const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "nataliahal@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = {
  to: "Nataliahal2018@gmail.com",
  from: "nataliahal@meta.ua",
  subject: "Test email",
  html: "<h1>Test email</h1>",
};

transport
  .sendMail(sendEmail)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));

module.exports = sendEmail;
