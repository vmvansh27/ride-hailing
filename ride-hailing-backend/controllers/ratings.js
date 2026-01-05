const db = require("../db");
exports.rate = (req, res) => {
    const { ride_id, given_by, given_to, score, comment } = req.body;

    db.query(
"INSERT INTO ratings(ride_id,given_by,given_to,score,comment) VALUES (?,?,?,?,?)",
[ride_id, given_by, given_to, score, comment],
(err) => {

    if (err) return res.json({ success: false });

    res.json({ success: true, message: "Rating submitted" });
}
);
};