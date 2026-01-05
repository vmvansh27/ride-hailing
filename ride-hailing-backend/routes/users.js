const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
router.post("/register", users.register);
router.post("/login", users.login);
module.exports = router;

const db = require("../db");
const bcrypt = require("bcrypt");
exports.register = (req, res) => {
    const { full_name, email, phone, password, role, license_number } = req.body;
    const hashed = bcrypt.hashSync(password, 10);
db.query(
"INSERT INTO users(full_name,email,phone,password,role,license_number) VALUES (?,?,?,?,?,?)",
[full_name, email, phone, hashed, role, license_number],
(err) => {
if (err)
return res.json({ success: false, message: "User already exists" });
res.json({ success: true, message: "User created" });
}
);
};
exports.login = (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE email=?", [email], (err, rows) => {
if (!rows.length) return res.json({ success: false, message: "Invalid" });
const user = rows[0];
if (!bcrypt.compareSync(password, user.password))
return res.json({ success: false, message: "Invalid" });
res.json({ success: true, user });
});
};