const passport = require("passport");
const User = require("../models/users");
const Status = require("http-status-codes").StatusCodes;

function getRequestBody(body) {
  return {
    ...body,
  };
}

module.exports = {
  create: (req, res, next) => {
    let userParams = getRequestBody(req.body);
    console.log("user body: ", userParams);

    let user = new User(userParams);

    User.register(user, req.body.password)
      .then((user) => {
        console.log("User created successfully", user.ObjectId);
        res.status(Status.OK);
        res.send("USer created Successfully");
      })
      .catch((error) => {
        console.log(`Error saving user: ${error.message}`);
        res.status(Status.INTERNAL_SERVER_ERROR);
        res.send("Error creating the user");
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

    console.log(redirectPath);
    if (redirectPath) {
      error ? res.status(Status.BAD_REQUEST) : res.status(Status.OK);
      res.redirect(redirectPath);
    } else next();
  },
};
