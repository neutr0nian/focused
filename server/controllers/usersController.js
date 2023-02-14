const ejs = require("ejs");
const path = require("path");
const passport = require("passport");
const User = require("../models/users");
const { sendMail } = require("../services/emailService");
const { generateOtp } = require("../utils/otpGenerator");
const Status = require("http-status-codes").StatusCodes;

function getRequestBody(body) {
  return {
    ...body,
  };
}

module.exports = {
  create: (req, res, next) => {
    let userParams = getRequestBody(req.body);

    let user = new User(userParams);
    user.otp = generateOtp();

    User.register(user, req.body.password)
      .then((user) => {
        console.log("User created successfully", user.ObjectId);
        req.user = user;
        next();
      })
      .catch((error) => {
        console.log(`Error occured while saving user: ${error.message}`);
        res.status(Status.INTERNAL_SERVER_ERROR);
        res.send("Error creating the user");
      });
  },
  sendOTP: (req, res, next) => {
    const user = req.user || req.body.user;
    const templatePath = path.join(
      __dirname,
      "..",
      "/utils/templates/welcome.ejs"
    );
    let otp = user?.otp;
    if (req.body.resend) {
      otp = generateOtp();
      User.findOneAndUpdate({ email: user.email }, { otp: otp })
        .then((user) => {
          console.log("User OTP updated successfully");
        })
        .catch((error) => {
          console.log(`Error occured while updating the OTP: ${error.message}`);
          res.status(Status.INTERNAL_SERVER_ERROR);
          res.send({
            message: "Internal server error",
          });
        });
    }
    ejs.renderFile(
      templatePath,
      { otp: otp, receiver: user.email },
      (err, data) => {
        if (err) {
          console.log("Error while generating template", err);
          return;
        }
        sendMail(user.email, "Welcome to Focused", data)
          .then((data) => {
            res.status(Status.OK);
            res.send({
              message: "OTP is sent to your egistered email address",
            });
          })
          .catch((error) => {
            console.error(
              `Error occured while sending email: ${error.message}`
            );
            res.status(Status.INTERNAL_SERVER_ERROR);
            res.send({
              message: "Sending OTP failed",
            });
          });
      }
    );
  },
  verifyEmail: (req, res) => {
    const { email, otp } = req.body;

    User.findOne({ email })
      .then((user) => {
        if (user.otp == otp) {
          user.active = true;
          res.status(Status.OK);
          res.send({
            message: "Your email is verified",
          });
        } else {
          res.status(Status.FORBIDDEN);
          res.send({
            message: "Please enter correct OTP",
          });
        }
      })
      .catch((error) => {
        console.error(`Error occured while fetching user: ${error.message}`);
      });
  },
  authenticate: passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureMessage: "Failed to login",
    successRedirect: "/",
    successMessage: "User logged in",
  }),
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    let error = res.locals.failureMessage;

    if (redirectPath) {
      error ? res.status(Status.BAD_REQUEST) : res.status(Status.OK);
      res.redirect(redirectPath);
    } else next();
  },
};
