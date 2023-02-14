const nodemailer = require("nodemailer");
const { MAIL_CONFIG } = require("../constants/config");

const transporter = nodemailer.createTransport(MAIL_CONFIG);

async function sendMail(receiver, subject, template) {
  try {
    let info = await transporter.sendMail({
      from: MAIL_CONFIG.auth.user,
      to: receiver,
      subject: subject,
      html: template,
    });
    return info;
  } catch (error) {
    console.error(`Error occured while sending email: ${error.message}`);
    return false;
  }
}

module.exports = {
  sendMail,
};
