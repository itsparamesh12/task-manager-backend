const express = require("express");

const Task = require("../models/Task");

const {
  authMiddleware,
  roleMiddleware
} = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE TASK (ADMIN ONLY)

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),

  async (req, res) => {

    try {

      const task = await Task.create(req.body);

      res.status(201).json(task);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }
  }
);


// GET ALL TASKS

router.get(
  "/",
  authMiddleware,

  async (req, res) => {

    try {

      const tasks = await Task.find()
        .populate("assignedTo", "name email")
        .populate("projectId", "title");

      res.json(tasks);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }
  }
);


// UPDATE TASK STATUS

router.put(
  "/:id",
  authMiddleware,

  async (req, res) => {

    try {

      const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.json(task);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }
  }
);

module.exports = router;