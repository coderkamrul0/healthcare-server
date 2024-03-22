import nodemailer from "nodemailer";
import config from "../../../config";

const emailSender = async (email: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: config.email,
      pass: config.app_password,
    },
  });

  const info = await transporter.sendMail({
    from: `"Next Health Care" <${config.email}>`, // sender address
    to: email, // list of receivers
    subject: "Next Health Care Reset Password Link!", // Subject line
    // text: "example"
    html: html,
  });

  console.log("Message sent: %s", info.messageId);
};

export default emailSender;
