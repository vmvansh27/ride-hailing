import { Sequelize } from "sequelize";
import config from "./config.js";

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        logging: false
    }
);

export default sequelize;
