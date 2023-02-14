const otpGenerator = require("otp-generator");

module.exports.generateOtp = () => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: true,
    specialChars: false,
  });
  return otp;
};
