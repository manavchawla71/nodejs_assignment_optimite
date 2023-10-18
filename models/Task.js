const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["in progress", "completed"], required: true },
  dueDate: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Link task to a user
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
