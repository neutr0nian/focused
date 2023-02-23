const router = require("express").Router();
const projectsController = require("../controllers/projectsController");
const token = require("../middlewares/authentication/token");

router.get("/show", token.authenticateToken, projectsController.show);
router.post("/create", token.authenticateToken, projectsController.create);
router.put("/update", token.authenticateToken, projectsController.update);

module.exports = router;
