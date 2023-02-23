const Task = require("../models/tasks");
const User = require("../models/users");
const Status = require("http-status-codes").StatusCodes;
const { getRequestBody } = require("../utils/request.js");

module.exports = {
  create: (req, res, next) => {
    let newTask = getRequestBody(req.body.task);
    newTask["userId"] = req.user._id;

    Task.create(newTask)
      .then((task) => {
        res.status(Status.OK);
        res.send({
          message: `Task added successfully ${task}`,
          data: task,
        });
      })
      .catch((error) => {
        console.error(`Error occured while adding task ${error.message}`);
        res.status(Status.INTERNAL_SERVER_ERROR);
        next();
      });
  },
  show: (req, res, next) => {
    if (!req.user) {
      res.status(Status.FORBIDDEN);
      res.send({
        message: "User not logged in",
      });
      return;
    }

    let user = req.user;
    Task.find({ userId: user._id })
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
  update: (req, res) => {
    const { _id } = req.body.task;

    Task.findByIdAndUpdate({ _id: _id }, { ...req.body.task })
      .then((task) => {
        console.log("Task updated successfully");
        res.status(Status.OK);
        res.json({
          message: "Task updated",
        });
      })
      .catch((error) => {
        console.error(
          `Error occured while updating the task: ${error.message}`
        );
        res.sendStatus(Status.INTERNAL_SERVER_ERROR);
      });
  },
  delete: (req, res) => {
    const { _id } = req.body.task;

    Task.findByIdAndDelete({ _id: _id })
      .then((task) => {
        console.log("Task deleted successfully");
        res.status(Status.OK);
        res.json({
          message: "Task deleted",
        });
      })
      .catch((error) => {
        console.log(`Error occured while deleting a task: ${error.message}`);
      });
  },
};
