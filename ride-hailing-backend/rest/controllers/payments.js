import { Payment } from "../models/index.js";

export const pay = async (req, res) => {
    try {
        await Payment.create({
            ride_id: req.body.ride_id,
            amount: req.body.amount,
            method: req.body.method,
            status: "completed",
        });

        res.json({ success: true, message: "Payment processed" });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

export const listPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll();
        res.json(payments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

