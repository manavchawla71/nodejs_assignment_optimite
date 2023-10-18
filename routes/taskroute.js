const express = require("express");
const authenticateJWT = require("../authmiddleware");

const Task = require("../models/Task");
const router = express.Router();

router.post("/todos", authenticateJWT, async (req, res) => {
  try {
    const { title, description, status, dueDate, user } = req.body;
    const newTask = new Task({ title, description, status, dueDate, user });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: "Failed to create the task" });
  }
});

router.get("/todos", authenticateJWT, async (req, res) => {
  try {
    const todos = await Task.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
});

router.get("/todos/:id", authenticateJWT, async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve the task" });
  }
});

router.put("/todos/:id", authenticateJWT, async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, status, dueDate } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, status, dueDate },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to update the task" });
  }
});

router.delete("/todos/:id", authenticateJWT, async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndRemove(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(deletedTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete the task" });
  }
});

module.exports = router;
