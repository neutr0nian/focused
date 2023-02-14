const router = require("express").Router();
const taskController = require("../controllers/tasksController");
const token = require("../middlewares/authentication/token");

/* tasks */
router.post("/create", token.authenticateToken, taskController.create);
router.get("/show", token.authenticateToken, taskController.show);

module.exports = router;
