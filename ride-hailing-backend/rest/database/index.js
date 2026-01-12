const { Sequelize } = require("sequelize");
const config = require("./config");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect
    }
);
sequelize.authenticate()
    .then(() => console.log("Sequelize connected to MySQL"))
    .catch(err => console.log("Error connecting:", err));
module.exports = sequelize;