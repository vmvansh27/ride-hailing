const express = require("express");
const router = express.Router();
const vehicles = require("../controllers/vehicles");
router.post("/", vehicles.addVehicle);
router.get("/:driver_id", vehicles.getVehicle);
module.exports = router;

const db = require("../db");
exports.addVehicle = (req, res) => {
    const { driver_id, make, model, plate_number, color, year } = req.body;
    db.query(
"INSERT INTO vehicles(driver_id,make,model,plate_number,color,year) VALUES (?,?,?,?,?,?)",
[driver_id, make, model, plate_number, color, year],
(err) => {
    if (err) return res.json({ success: false });
    res.json({ success: true, message: "Vehicle added" });
}
);
};
exports.getVehicle = (req, res) => {
db.query(
"SELECT * FROM vehicles WHERE driver_id=?",
[req.params.driver_id],
(err, rows) => {
    res.json(rows[0] || {});
    }
);
};