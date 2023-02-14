const router = require("express").Router();
const usersController = require("../controllers/usersController");

/* user login and signup */
router.post(
  "/login",
  usersController.authenticate,
  usersController.redirectView
);
router.post("/signup", usersController.create, usersController.sendOTP);
router.get("/sendOTP", usersController.sendOTP);
module.exports = router;
