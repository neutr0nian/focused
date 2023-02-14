const Tasks = require("../models/tasks");
const User = require("../models/users");
const Status = require("http-status-codes").StatusCodes;
const { getRequestBody } = require("../utils/request.js");

module.exports = {
  create: (req, res, next) => {
    let newTask = getRequestBody(req.body);
    newTask["userId"] = res.locals.user._id;

    Tasks.create(newTask)
      .then((task) => {
        //associate the new task to the user
        User.findByIdAndUpdate(res.locals.user._id, {
          $push: { tasks: task._id },
        })
          .then((user) => console.log("Added task to user account", user))
          .catch((error) => {
            console.error(
              `Error while adding task to the user account: ${error.message}`
            );
            res.status(Status.INTERNAL_SERVER_ERROR);
            res.send({
              message: "Failed: Adding task to the user account",
            });
          });
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
      return;
    }

    let user = res.locals.user;
    Tasks.find({ _id: { $in: user.tasks } })
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
