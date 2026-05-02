const express = require("express");

const Task = require("../models/Task");

const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();


router.get(
  "/",
  authMiddleware,

  async (req, res) => {

    try {

      const totalTasks = await Task.countDocuments();

      const completedTasks = await Task.countDocuments({
        status: "Done"
      });

      const pendingTasks = await Task.countDocuments({
        status: "Todo"
      });

      const overdueTasks = await Task.countDocuments({
        dueDate: { $lt: new Date() },
        status: { $ne: "Done" }
      });

      res.json({
        totalTasks,
        completedTasks,
        pendingTasks,
        overdueTasks
      });

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }
  }
);

module.exports = router;