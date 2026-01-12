// import express from "express";
// import "./models/index.js";

// import userRoutes from "./routes/users.js";
// import vehicleRoutes from "./routes/vehicles.js";
// import rideRoutes from "./routes/rides.js";
// import paymentRoutes from "./routes/payments.js";
// import ratingRoutes from "./routes/ratings.js";

// const app = express();
// app.use(express.json());

// app.use("/users", userRoutes);
// app.use("/vehicles", vehicleRoutes);
// app.use("/rides", rideRoutes);
// app.use("/payments", paymentRoutes);
// app.use("/ratings", ratingRoutes);

// app.listen(5000, () => console.log("REST API running on port 5000"));




import express from "express";
import "./models/index.js"; // Loads Sequelize + relationships

import userRoutes from "./routes/users.js";
import vehicleRoutes from "./routes/vehicles.js";
import rideRoutes from "./routes/rides.js";
import paymentRoutes from "./routes/payments.js";
import ratingRoutes from "./routes/ratings.js";

const app = express();
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/rides", rideRoutes);
app.use("/payments", paymentRoutes);
app.use("/ratings", ratingRoutes);

app.listen(5000, () => console.log("REST API running on port 5000"));
