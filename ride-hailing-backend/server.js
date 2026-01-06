const express = require("express");
const app = express();
app.use(express.json());
// Load Sequelize models + relationships
require("./models");
// Routes
app.use("/users", require("./routes/users"));
app.use("/vehicles", require("./routes/vehicles"));
app.use("/rides", require("./routes/rides"));
app.use("/payments", require("./routes/payments"));
app.use("/ratings", require("./routes/ratings"));
app.listen(5000, () => console.log("Server running on port 5000"));