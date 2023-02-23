const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: new Date().toISOString(),
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
