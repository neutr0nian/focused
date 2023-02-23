const router = require("express").Router();

const userRoutes = require("./usersRoutes");
const taskRoutes = require("./tasksRoutes");
const projectRoutes = require("./projectsRoutes");
const homeRoutes = require("./homeRoutes");
const errorRoutes = require("./errorRoutes");

router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/projects", projectRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;
