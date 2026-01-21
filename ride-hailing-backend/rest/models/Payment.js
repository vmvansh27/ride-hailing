// const { DataTypes } = require("sequelize");
// const sequelize = require("../database");
// const Payment = sequelize.define("Payment", {
//     payment_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     amount: DataTypes.DECIMAL,
//     method: DataTypes.ENUM("cash", "credit_card", "wallet", "upi"),
//     status: DataTypes.ENUM("pending", "completed", "failed")
// },
//     {
//         timestamps: false

//     });
// module.exports = Payment;




import { DataTypes } from "sequelize";
import sequelize from "../database/index.js";

const Payment = sequelize.define(
    "Payment",
    {
        payment_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        amount: DataTypes.DECIMAL,
        method: DataTypes.ENUM("cash", "credit_card", "wallet", "upi"),
        status: DataTypes.ENUM("pending", "completed", "failed")
    },
    { timestamps: false }
);

export default Payment;
