const db = require("../db");
exports.pay = (req, res) => {
    const { ride_id, amount, method } = req.body;
    db.query(
"INSERT INTO payments(ride_id,amount,method,status) VALUES (?,?,?,?)",
[ride_id, amount, method, "completed"],
(err) => {
    if (err) return res.json({ success: false });
    res.json({ success: true, message: "Payment processed" });
}
);
};

