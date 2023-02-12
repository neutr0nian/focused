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
});

module.exports = mongoose.model("Task", taskSchema);
