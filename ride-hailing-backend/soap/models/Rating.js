import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Rating = sequelize.define('Rating', {
  ride_id: { type: DataTypes.INTEGER, allowNull: false },
  given_by: { type: DataTypes.INTEGER, allowNull: false },
  given_to: { type: DataTypes.INTEGER, allowNull: false },
  score: { type: DataTypes.INTEGER, allowNull: false },
  comment: { type: DataTypes.TEXT }
}, {
  tableName: 'ratings', 
});

export default Rating;