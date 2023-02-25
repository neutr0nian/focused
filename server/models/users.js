const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = mongoose.Schema({
  name: {
    first: {
      type: String,
      trim: true,
    },
    last: {
      type: String,
      trim: true,
    },
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
  },
  created: {
    type: String,
    default: new Date().toISOString(),
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
});

userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

module.exports = mongoose.model("User", userSchema);
