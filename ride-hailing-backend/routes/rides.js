const express = require("express");
const router = express.Router();
const rides = require("../controllers/rides");
router.post("/request", rides.requestRide);
router.get("/", rides.listRides);
router.patch("/:id/accept", rides.acceptRide);
router.patch("/:id/start", rides.startRide);
router.patch("/:id/complete", rides.completeRide);
router.patch("/:id/cancel", rides.cancelRide);
module.exports = router;

const db = require("../db");
exports.requestRide = (req, res) => {
    const { rider_id, pickup, drop } = req.body;
    db.query(
"INSERT INTO rides(rider_id,pickup_location,drop_location,status) VALUES (?,?,?,?)",
[rider_id, pickup, drop, "requested"],
() => res.json({ success: true, message: "Ride requested" })
);
};
exports.listRides = (req, res) => {
db.query("SELECT * FROM rides WHERE status='requested'", (err, rows) => {
res.json(rows);
});
};
exports.acceptRide = (req, res) => {
db.query(
"UPDATE rides SET driver_id=?, status='ongoing' WHERE ride_id=?",
[req.body.driver_id, req.params.id],
() => res.json({ success: true })
);
};
exports.startRide = (req, res) => {
db.query(
"UPDATE rides SET start_time=NOW(), status='ongoing' WHERE ride_id=?",
[req.params.id],
() => res.json({ success: true })
);
};
exports.completeRide = (req, res) => {
db.query(
"UPDATE rides SET end_time=NOW(), fare=?, status='completed' WHERE ride_id=?",
[req.body.fare, req.params.id],
() => res.json({ success: true })
);
};
exports.cancelRide = (req, res) => {
db.query(
"UPDATE rides SET status='cancelled' WHERE ride_id=?",
[req.params.id],
() => res.json({ success: true })
);
};