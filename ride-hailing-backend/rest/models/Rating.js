// const { DataTypes } = require("sequelize");
// const sequelize = require("../database");
// const Rating = sequelize.define("Rating", {
//     rating_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     score: DataTypes.INTEGER,
//     comment: DataTypes.TEXT
// },
//     {
//         timestamps: false

//     });
// module.exports = Rating;




import { DataTypes } from "sequelize";
import sequelize from "../database/index.js";

const Rating = sequelize.define(
    "Rating",
    {
        rating_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        score: DataTypes.INTEGER,
        comment: DataTypes.TEXT
    },
    { timestamps: false }
);

export default Rating;
