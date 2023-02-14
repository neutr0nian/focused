const MAIL_CONFIG = {
  service: "gmail",
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASS,
  },
};

module.exports = {
  MAIL_CONFIG,
};
