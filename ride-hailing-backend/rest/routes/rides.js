// const express = require("express");
// const router = express.Router();
// const rides = require("../rest/controllers/rides");
// router.post("/request", rides.requestRide);
// router.get("/", rides.listRides);
// router.patch("/:id/accept", rides.acceptRide);
// router.patch("/:id/start", rides.startRide);
// router.patch("/:id/complete", rides.completeRide);
// router.patch("/:id/cancel", rides.cancelRide);
// module.exports = router;


import express from "express";
import {
    requestRide,
    listRides,
    acceptRide,
    startRide,
    completeRide,
    cancelRide
} from "../controllers/rides.js";

const router = express.Router();

// Rider requests a ride
router.post("/request", requestRide);

// Driver sees requested rides
router.get("/", listRides);

// Driver accepts ride
router.patch("/:id/accept", acceptRide);

// Driver starts ride
router.patch("/:id/start", startRide);

// Driver completes ride
router.patch("/:id/complete", completeRide);

// Cancel ride
router.patch("/:id/cancel", cancelRide);

export default router;
