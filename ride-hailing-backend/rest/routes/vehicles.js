const express = require("express");
const router = express.Router();
const vehicles = require("../rest/controllers/vehicles");
router.post("/", vehicles.addVehicle);
router.get("/:driver_id", vehicles.getVehicle);
module.exports = router;
