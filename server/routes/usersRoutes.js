const router = require("express").Router();
const usersController = require("../controllers/usersController");

router.get("/signup", usersController.signup);

module.exports = router;
