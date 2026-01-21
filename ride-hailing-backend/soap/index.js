import express from 'express';
import soap from 'soap';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import sequelize from './config/database.js';
import Rating from './models/Rating.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const ratingService = {
  RatingService: {
    RatingPort: {
      submitRating: async (args, callback) => {
        try {
          const { ride_id, given_by, given_to, score, comment } = args;

          const newRating = await Rating.create({
            ride_id,
            given_by,
            given_to,
            score,
            comment
          });

          callback({
            status: "SUCCESS",
            message: `Rating created with ID: ${newRating.id}`
          });
        } catch (err) {
          callback({ status: "FAILURE", message: err.message });
        }
      }
    }
  }
};

const wsdl = fs.readFileSync(path.join(__dirname, 'rating-service.wsdl'), 'utf8');

sequelize.authenticate()
  .then(() => {
    console.log('DB connected');
    app.listen(3001, () => {
      soap.listen(app, '/soap/rating', ratingService, wsdl, () => {
        console.log('running at http://localhost:3001/soap/rating?wsdl');
      });
    });
  })
  .catch(err => console.error('DB Error:', err));
