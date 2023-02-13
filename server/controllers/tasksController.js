const Tasks = require("../models/tasks");
const Status = require("http-status-codes").StatusCodes;
const { getRequestBody } = require("../utils/request.js");

module.exports = {
  create: (req, res, next) => {
    let newTask = getRequestBody(req.body);
    newTask["userId"] = res.locals.user._id;

    Tasks.create(newTask)
      .then((task) => {
        res.status(Status.OK);
        res.send({
          message: `Task added successfully ${newTask.title}`,
        });
      })
      .catch((error) => {
        console.error(`Error occured while adding task ${error.message}`);
        res.status(Status.INTERNAL_SERVER_ERROR);
        next();
      });
  },
  show: (req, res, next) => {
    if (!res.locals?.loggedIn) {
      res.status(Status.FORBIDDEN);
      res.send({
        message: "User not logged in",
      });
    }

    let userId = res.locals.user._id;
    Tasks.find({ userId: userId })
      .then((task) => {
        console.log(`Task fetched successfully ${task}`);
        res.status(Status.OK);
        res.send({
          data: task,
        });
      })
      .catch((error) => {
        console.error(`Error while fetching task: ${error.message}`);
        next();
      });
  },
};
