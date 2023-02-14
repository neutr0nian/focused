const mongoose = require("mongoose");
const User = require("./users");

const taskSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  body: {
    type: String,
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
