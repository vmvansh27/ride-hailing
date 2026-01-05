const express = require("express");
const router = express.Router();
const ratings = require("../controllers/ratings");
router.post("/", ratings.rate);
module.exports = router;

const db = require("../db");
exports.rate = (req, res) => {
    const { ride_id, given_by, given_to, score, comment } = req.body;
    db.query(
"INSERT INTO ratings(ride_id,given_by,given_to,score,comment) VALUES (?,?,?,?,?)",
[ride_id, given_by, given_to, score, comment],
() => res.json({ success: true })
);
};
''