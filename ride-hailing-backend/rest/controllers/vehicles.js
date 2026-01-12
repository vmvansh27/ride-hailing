import { Vehicle } from "../models/index.js";

export const addVehicle = async (req, res) => {
    try {
        await Vehicle.create({
            driver_id: req.body.driver_id,
            make: req.body.make,
            model: req.body.model,
            plate_number: req.body.plate_number,
            color: req.body.color,
            year: req.body.year,
        });

        res.json({ success: true, message: "Vehicle added" });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

export const getVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findOne({
            where: { driver_id: req.params.driver_id },
        });

        res.json(vehicle || {});
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};
