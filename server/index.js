require("dotenv").config();

const PORT = 3000;
const express = require("express");
const router = require("./routes/index");

const mongoose = require("mongoose");
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
app.use(express.static("public"));
app.use((req, res, next) => {
  next();
});
app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running on port:${PORT}`);
});
