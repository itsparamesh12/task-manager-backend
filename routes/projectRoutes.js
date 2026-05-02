const express = require("express");

const Project = require("../models/Project");

const {
  authMiddleware,
  roleMiddleware
} = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE PROJECT (ADMIN ONLY)

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),

  async (req, res) => {

    try {

      const project = await Project.create({
        ...req.body,
        createdBy: req.user.id
      });

      res.status(201).json(project);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }
  }
);


// GET ALL PROJECTS

router.get(
  "/",
  authMiddleware,

  async (req, res) => {

    try {

      const projects = await Project.find()
        .populate("createdBy", "name email")
        .populate("members", "name email");

      res.json(projects);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }
  }
);

module.exports = router;