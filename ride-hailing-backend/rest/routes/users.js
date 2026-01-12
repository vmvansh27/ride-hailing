const express = require("express");
const router = express.Router();
const users = require("../rest/controllers/users");

// Register a new user (rider or driver)
router.post("/register", users.register);

// Login user
router.post("/login", users.login);

module.exports = router;
