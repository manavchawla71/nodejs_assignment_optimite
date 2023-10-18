const express = require("express");
const mongoose = require("mongoose"); // for request logging
const morgan = require("morgan");
const dotenv = require("dotenv");
const authenticateJWT = require("./authmiddleware");
dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(`${process.env.MONGO_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
const taskroutes = require("./routes/taskroute");
const userroutes = require("./routes/userroute");
app.use("/api", taskroutes);
app.use("/api", userroutes);
app.use(morgan("combined"));
app.listen(4000, () => {
  console.log("connected to server");
});
