require("dotenv").config();

const PORT = 3000;
const path = require("path");
const express = require("express");
const cors = require("cors");
const router = require("./routes/index");
const passport = require("passport");
const expressSession = require("express-session");
const mongoose = require("mongoose");

const User = require("./models/users");

const db = mongoose.connection;

const MONGO_URI = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER}/focused_db?retryWrites=true&w=majority`;
console.log(MONGO_URI);
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useNewUrlParser: true });

db.once("open", () => {
  console.log("Successfully connected to the database");
});

const app = express();

app.set("port", process.env.PORT || PORT);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(
  cors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    exposedHeaders: ["x-auth-token"],
  })
);
app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.use(
  expressSession({
    secret: "focused_api_password",
    cookie: {
      maxAge: 400000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.user = req.user;
  next();
});

app.use("/api/v1/", router);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(app.get("port"), () => {
  console.log(`Server running on port:${PORT}`);
});
