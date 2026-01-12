const { Rating } = require("../models");
exports.rate = async (req, res) => {
    try {
        await Rating.create({
            ride_id: req.body.ride_id,
            given_by: req.body.given_by,
            given_to: req.body.given_to,
            score: req.body.score,
            comment: req.body.comment
        });
        res.json({ success: true, message: "Rating submitted" });

    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};