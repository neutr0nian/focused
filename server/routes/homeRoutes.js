const router = require("express").Router();
// const homeController = require("../controllers/homeController");

router.get("/", (req, res) => {
  res.send("Welcome to Confetti Cuisine!");
});

module.exports = router;
