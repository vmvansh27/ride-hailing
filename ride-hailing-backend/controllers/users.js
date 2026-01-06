const bcrypt = require("bcrypt");
const { User } = require("../models");
exports.register = async (req, res) => {
    try {
        const hashed = bcrypt.hashSync(req.body.password, 10);
        await User.create({
            full_name: req.body.full_name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashed,
            role: req.body.role,
            license_number: req.body.license_number
        });
        res.json({ success: true, message: "User created" });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) return res.json({ success: false, message: "Invalid login" });
        const match = bcrypt.compareSync(req.body.password, user.password);
        if (!match) return res.json({ success: false, message: "Invalid login" });
        res.json({ success: true, user });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};