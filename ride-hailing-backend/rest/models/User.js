// const { DataTypes } = require("sequelize");
// const sequelize = require("../database");
// const User = sequelize.define("User", {
//     user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     full_name: DataTypes.STRING,
//     email: { type: DataTypes.STRING, unique: true },
//     phone: DataTypes.STRING,
//     password: DataTypes.STRING,
//     role: DataTypes.ENUM("rider", "driver"),
//     license_number: { type: DataTypes.STRING, unique: true, allowNull: true }
// }, {
//     timestamps: false

// });
// module.exports = User;


import { DataTypes } from "sequelize";
import sequelize from "../database/index.js";

const User = sequelize.define(
    "User",
    {
        user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        full_name: DataTypes.STRING,
        email: { type: DataTypes.STRING, unique: true },
        phone: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.ENUM("rider", "driver"),
        license_number: { type: DataTypes.STRING, unique: true, allowNull: true }
    },
    { timestamps: false }
);

export default User;
