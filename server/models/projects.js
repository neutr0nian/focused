const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userEmails: [
    {
      type: String,
    },
  ],
  name: {
    type: String,
    required: true,
    unique: true,
  },
  created: {
    type: Date,
    required: true,
    default: new Date().toISOString(),
  },
  deadline: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "ongoing",
  },
  delete: {
    type: Boolean,
    default: false,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

module.exports = mongoose.model("Project", projectSchema);
