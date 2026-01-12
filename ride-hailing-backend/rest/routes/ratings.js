// const express = require("express");
// const router = express.Router();
// const ratings = require("../controllers/ratings");
// router.post("/", ratings.rate);
// module.exports = router;


import express from "express";
import { rate } from "../controllers/ratings.js";

const router = express.Router();

// Submit rating
router.post("/", rate);

export default router;
