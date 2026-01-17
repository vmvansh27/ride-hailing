import { Rating } from "../models/index.js";

export const rate = async (req, res) => {
    try {
        await Rating.create({
            ride_id: req.body.ride_id,
            given_by: req.body.given_by,
            given_to: req.body.given_to,
            score: req.body.score,
            comment: req.body.comment,
        });

        res.json({ success: true, message: "Rating submitted" });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

export const listRatings = async (req, res) => {
    try {
        const ratings = await Rating.findAll();
        res.json(ratings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

