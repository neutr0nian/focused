const ejs = require("ejs");
const path = require("path");
const Project = require("../models/projects");
const { sendMail } = require("../services/emailService");
const { getRequestBody } = require("../utils/request");
const Status = require("http-status-codes").StatusCodes;

module.exports = {
  create: (req, res) => {
    let newProject = getRequestBody(req.body.project);
    newProject["userId"] = req.user._id;

    Project.create(newProject)
      .then((project) => {
        console.log("Project created successfully", newProject);
        res.status(Status.OK);
        res.json({
          message: "Project created",
          data: project,
        });
      })
      .catch((error) => {
        console.error(`Error while creating new project: ${error.message}`);
        res.status(Status.INTERNAL_SERVER_ERROR);
        res.json({
          message: "Could not create project. Please try again!",
        });
      });
  },
  update: (req, res) => {
    const { _id } = req.body.project;

    Project.findByIdAndUpdate({ _id: _id }, { ...req.body.project })
      .then((project) => {
        console.log("Project updated successfully", project);
        res.status(Status.OK);
        res.json({
          message: "Project details updated",
          data: project,
        });
      })
      .catch((error) => {
        console.error(
          `Error occurred while updating project: ${error.message}`
        );
        res.status(Status.INTERNAL_SERVER_ERROR);
        res.json({
          message: "Could not update project, Please try again",
        });
      });
  },
  show: (req, res) => {
    const { email } = req.user;
    console.log(email);
    Project.find({ userEmails: email })
      .then((project) => {
        console.log("Projects fetched successfully", project);
        res.status(Status.OK);
        res.json({
          message: "Projects fetched successfully",
          data: project,
        });
      })
      .catch((error) => {
        console.error(
          `Error occured while fetching projects: ${error.message}`
        );
        res.status(Status.INTERNAL_SERVER_ERROR);
        res.json({
          message: "Could not get your projects, please try again",
        });
      });
  },
  addUsers: (req, res, next) => {
    const user = req.user;
    const { project } = req.body;
    const { userEmails } = project;
    const templatePath = path.join(
      __dirname,
      "..",
      "/utils/templates/invite.ejs"
    );

    userEmails.forEach((email) => {
      ejs.renderFile(
        templatePath,
        { projectName: project.name, inviter: user.email, receiver: email },
        (err, data) => {
          if (err) {
            console.log("Error while generating template: ", err);
            return;
          }
          sendMail(email, "You are invited!", data)
            .then(() => {
              next();
            })
            .catch((err) => {
              next(err);
            });
        }
      );
    });
  },
};
