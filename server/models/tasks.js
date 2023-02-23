const mongoose = require("mongoose");
const User = require("./users");

const taskSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
  lane: {
    type: Number,
    default: 1,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  created: {
    type: String,
    default: new Date().toISOString(),
  },
  edited: {
    type: Date,
    default: new Date().toISOString(),
  },
});

module.exports = mongoose.model("Task", taskSchema);
