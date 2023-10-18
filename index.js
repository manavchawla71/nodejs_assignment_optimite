const express = require("express");
const mongoose = require("mongoose"); // for request logging
const morgan = require("morgan");
const authenticateJWT = require("./authmiddleware");
const app = express();
app.use(express.json());

mongoose.connect(
  "mongodb+srv://chawlamanav71:sLZvy2vbcld1bWGu@cluster0.vgyk3nc.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

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
