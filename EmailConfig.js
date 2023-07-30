const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./.env" });

const sendEmail = async (option) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOption = {
      from: "Ador Welding <itpune@adorians.com>",
      to: ["sanjaydeshmukh@adorians.com", "dba@adorians.com"],
      cc: ["avinash@adorians.com", "lpbansod@adorians.com"],
      bcc: ["sharankudtarkar@adorians.com"],
      subject: option.subject,
      html: option.html,
    };
    await transporter.sendMail(mailOption);
  } catch (error) {
    console.log("error in sending mail", error);
  }
};
module.exports = sendEmail;
