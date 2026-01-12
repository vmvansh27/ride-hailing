import { Sequelize } from "sequelize";

const sequelize = new Sequelize('rideHailing', 'root', 'qwerty123', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

export default sequelize;