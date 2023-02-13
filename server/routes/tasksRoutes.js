const router = require("express").Router();
const taskController = require("../controllers/tasksController");

/* tasks */
router.post("/create", taskController.create);
router.get("/show", taskController.show);

module.exports = router;
