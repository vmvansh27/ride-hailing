const db = require("../db");
const bcrypt = require("bcrypt");
exports.register = (req, res) => {
    const { full_name, email, phone, password, role, license_number } = req.body;
    const hashed = bcrypt.hashSync(password, 10);
db.query(
"INSERT INTO users(full_name,email,phone,password,role,license_number) VALUES (?,?,?,?,?,?)",
[full_name, email, phone, hashed, role, license_number],
(err) => {
if (err) {
return res.json({ success: false, message: "Email or license already exists" });
}
res.json({ success: true, message: "User created" });
}
);
};
exports.login = (req, res) => {
    const { email, password } = req.body;
db.query("SELECT * FROM users WHERE email=?", [email], (err, rows) => {
if (err || rows.length === 0) {
return res.json({ success: false, message: "Invalid email or password" });
}
const user = rows[0];
const match = bcrypt.compareSync(password, user.password);
if (!match) {
return res.json({ success: false, message: "Invalid email or password" });
}
res.json({
success: true,
message: "Login successful",
user,
});
});
};
