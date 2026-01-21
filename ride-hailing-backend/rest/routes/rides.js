import express from "express";
import {
    requestRide,
    listRides,
    acceptRide,
    startRide,
    completeRide,
    cancelRide,
    listAllRides   // 👈 add this
} from "../controllers/rides.js";

const router = express.Router();

// Rider requests a ride
router.post("/request", requestRide);

// Driver sees ONLY requested rides
router.get("/", listRides);

// Driver gets ALL rides (for current ride lookup, admin, etc.)
router.get("/all", listAllRides);   // 👈 NEW ROUTE

// Driver accepts ride
router.patch("/:id/accept", acceptRide);

// Driver starts ride
router.patch("/:id/start", startRide);

// Driver completes ride
router.patch("/:id/complete", completeRide);

// Cancel ride
router.patch("/:id/cancel", cancelRide);

export default router;
