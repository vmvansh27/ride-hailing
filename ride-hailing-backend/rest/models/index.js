// const sequelize = require("../database");
// const User = require("./User");
// const Vehicle = require("./Vehicle");
// const Ride = require("./Ride");
// const Payment = require("./Payment");
// const Rating = require("./Rating");
// // User → Vehicle (1:1)
// User.hasOne(Vehicle, { foreignKey: "driver_id" });
// Vehicle.belongsTo(User, { foreignKey: "driver_id" });
// // Rider → Rides (1:M)
// User.hasMany(Ride, { foreignKey: "rider_id", as: "riderRides" });
// // Driver → Rides (1:M)
// User.hasMany(Ride, { foreignKey: "driver_id", as: "driverRides" });
// // Ride → Payment (1:1)
// Ride.hasOne(Payment, { foreignKey: "ride_id" });
// Payment.belongsTo(Ride, { foreignKey: "ride_id" });
// // Rating (M:N through ride)
// User.hasMany(Rating, { foreignKey: "given_by", as: "givenRatings" });
// User.hasMany(Rating, { foreignKey: "given_to", as: "receivedRatings" });
// Ride.hasMany(Rating, { foreignKey: "ride_id" });
// sequelize.sync({ alter: true })
//     .then(() => console.log("Models synced with MySQL"))
//     .catch(err => console.log(err));
// module.exports = { User, Vehicle, Ride, Payment, Rating };



import sequelize from "../database/index.js";

import User from "./User.js";
import Vehicle from "./Vehicle.js";
import Ride from "./Ride.js";
import Payment from "./Payment.js";
import Rating from "./Rating.js";

// User → Vehicle (1:1)
User.hasOne(Vehicle, { foreignKey: "driver_id" });
Vehicle.belongsTo(User, { foreignKey: "driver_id" });

// Rider → Rides (1:M)
User.hasMany(Ride, { foreignKey: "rider_id", as: "riderRides" });

// Driver → Rides (1:M)
User.hasMany(Ride, { foreignKey: "driver_id", as: "driverRides" });

// Ride → Payment (1:1)
Ride.hasOne(Payment, { foreignKey: "ride_id" });
Payment.belongsTo(Ride, { foreignKey: "ride_id" });

// Rating (M:N through ride)
User.hasMany(Rating, { foreignKey: "given_by", as: "givenRatings" });
User.hasMany(Rating, { foreignKey: "given_to", as: "receivedRatings" });
Ride.hasMany(Rating, { foreignKey: "ride_id" });

await sequelize.sync({ alter: true });

export { User, Vehicle, Ride, Payment, Rating };
