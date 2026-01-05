const express = require("express");
const router = express.Router();
const payments = require("../controllers/payments");
router.post("/", payments.pay);
module.exports = router;

const db = require("../db");
exports.pay = (req, res) => {
    const { ride_id, amount, method } = req.body;
    db.query(
"INSERT INTO payments(ride_id,amount,method,status) VALUES (?,?,?,?)",
[ride_id, amount, method, "completed"],
() => res.json({ success: true })
);
};