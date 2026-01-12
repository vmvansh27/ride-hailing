// const express = require("express");
// const router = express.Router();
// const vehicles = require("../rest/controllers/vehicles");
// router.post("/", vehicles.addVehicle);
// router.get("/:driver_id", vehicles.getVehicle);
// module.exports = router;


import express from "express";
import { pay } from "../controllers/payments.js";

const router = express.Router();

// Process payment
router.post("/", pay);

export default router;
