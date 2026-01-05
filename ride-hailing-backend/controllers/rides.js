const db = require("../db");
exports.requestRide = (req, res) => {
    const { rider_id, pickup_location, drop_location } = req.body;
    db.query(
"INSERT INTO rides(rider_id,pickup_location,drop_location,status) VALUES (?,?,?,?)",
[rider_id, pickup_location, drop_location, "requested"],
(err) => {
    if (err) return res.json({ success: false });
    res.json({
success: true,
message: "Ride requested",
});
}
);
};
exports.listRides = (req, res) => {
db.query("SELECT * FROM rides WHERE status='requested'", (err, rows) => {

    if (err) return res.json({ success: false });
    res.json(rows);
});
};
exports.acceptRide = (req, res) => {
const ride_id = req.params.id;

const { driver_id } = req.body;

db.query(
"UPDATE rides SET driver_id=?, status='ongoing' WHERE ride_id=? AND status='requested'",
[driver_id, ride_id],
(err) => {

    if (err) return res.json({ success: false });

    res.json({ success: true, message: "Ride accepted" });
}
);
};
exports.startRide = (req, res) => {
const ride_id = req.params.id;
db.query(
"UPDATE rides SET start_time=NOW(), status='ongoing' WHERE ride_id=?",
[ride_id],
(err) => {

    if (err) return res.json({ success: false });

    res.json({ success: true, message: "Ride started" });
}
);
};
exports.completeRide = (req, res) => {
const ride_id = req.params.id;

const { fare } = req.body;
db.query(
"UPDATE rides SET end_time=NOW(), fare=?, status='completed' WHERE ride_id=?",
[fare, ride_id],
(err) => {

    if (err) return res.json({ success: false });

    res.json({ success: true, message: "Ride completed" });
}
);
};
exports.cancelRide = (req, res) => {
const ride_id = req.params.id;
db.query(
"UPDATE rides SET status='cancelled' WHERE ride_id=?",
[ride_id],
(err) => {

    if (err) return res.json({ success: false });

    res.json({ success: true, message: "Ride cancelled" });
}
);
};