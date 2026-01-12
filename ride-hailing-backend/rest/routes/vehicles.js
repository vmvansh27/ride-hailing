import express from "express";
import { addVehicle, getVehicle } from "../controllers/vehicles.js";

const router = express.Router();

// Add vehicle
router.post("/", addVehicle);

// Get vehicle by driver
router.get("/:driver_id", getVehicle);

export default router;
