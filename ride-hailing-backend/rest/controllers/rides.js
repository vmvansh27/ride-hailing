const { Ride } = require("../models");
exports.requestRide = async (req, res) => {
    try {
        await Ride.create({
            rider_id: req.body.rider_id,
            pickup_location: req.body.pickup_location,
            drop_location: req.body.drop_location,
            status: "requested"
        });
        res.json({ success: true, message: "Ride requested" });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};
exports.listRides = async (req, res) => {
    try {
        const rides = await Ride.findAll({
            where: { status: "requested" }
        });
        res.json(rides);
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};
exports.acceptRide = async (req, res) => {
    try {
        await Ride.update(
            {
                driver_id: req.body.driver_id,
                status: "ongoing"
            },
            { where: { ride_id: req.params.id } }
        );
        res.json({ success: true, message: "Ride accepted" });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};
exports.startRide = async (req, res) => {
    try {
        await Ride.update(
            {
                start_time: new Date(),
                status: "ongoing"
            },
            { where: { ride_id: req.params.id } }
        );
        res.json({ success: true, message: "Ride started" });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};
exports.completeRide = async (req, res) => {
    try {
        await Ride.update(
            {
                end_time: new Date(),
                fare: req.body.fare,
                status: "completed"
            },
            { where: { ride_id: req.params.id } }
        );
        res.json({ success: true, message: "Ride completed" });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};
exports.cancelRide = async (req, res) => {
    try {
        await Ride.update(
            { status: "cancelled" },
            { where: { ride_id: req.params.id } }
        );
        res.json({ success: true, message: "Ride cancelled" });
    } catch (err) {
        res.json({ success: false, message: err.message });


    }
};
