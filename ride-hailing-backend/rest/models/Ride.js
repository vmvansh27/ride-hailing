// const { DataTypes } = require("sequelize");
// const sequelize = require("../database");
// const Ride = sequelize.define("Ride", {
//     ride_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     pickup_location: DataTypes.TEXT,
//     drop_location: DataTypes.TEXT,
//     status: DataTypes.ENUM("requested", "ongoing", "completed", "cancelled"),
//     start_time: DataTypes.DATE,
//     end_time: DataTypes.DATE,
//     fare: DataTypes.DECIMAL
// }, {
//     timestamps: false

// });
// module.exports = Ride;




import { DataTypes } from "sequelize";
import sequelize from "../database/index.js";

const Ride = sequelize.define(
    "Ride",
    {
        ride_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        pickup_location: DataTypes.TEXT,
        drop_location: DataTypes.TEXT,
        status: DataTypes.ENUM("requested", "ongoing", "completed", "cancelled"),
        start_time: DataTypes.DATE,
        end_time: DataTypes.DATE,
        fare: DataTypes.DECIMAL
    },
    { timestamps: false }
);

export default Ride;
