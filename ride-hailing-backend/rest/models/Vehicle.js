// const { DataTypes } = require("sequelize");
// const sequelize = require("../database");
// const Vehicle = sequelize.define("Vehicle", {
//     vehicle_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     make: DataTypes.STRING,
//     model: DataTypes.STRING,
//     plate_number: DataTypes.STRING,
//     color: DataTypes.STRING,
//     year: DataTypes.INTEGER
// }, {
//     timestamps: false

// });
// module.exports = Vehicle;




import { DataTypes } from "sequelize";
import sequelize from "../database/index.js";

const Vehicle = sequelize.define(
    "Vehicle",
    {
        vehicle_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        make: DataTypes.STRING,
        model: DataTypes.STRING,
        plate_number: DataTypes.STRING,
        color: DataTypes.STRING,
        year: DataTypes.INTEGER
    },
    { timestamps: false }
);

export default Vehicle;
