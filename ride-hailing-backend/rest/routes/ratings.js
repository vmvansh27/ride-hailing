const express = require("express");
const router = express.Router();
const ratings = require("../controllers/ratings");
router.post("/", ratings.rate);
module.exports = router;
