import express from 'express';
import soap from 'soap';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qwerty123',
  database: 'ridehailing'
});

console.log(' MySQL connected');
const ratingService = {
  RatingService: {
    RatingPort: {
      submitRating: async (args) => {
        try {     
          const { ride_id, given_by, given_to, score, comment } = args;
          if (
            ride_id == null ||
            given_by == null ||
            given_to == null ||
            score == null ||
            comment == null
          ) {
            throw new Error('Missing required fields');
          }
          const [result] = await db.execute(
            `INSERT INTO ratings (ride_id, given_by, given_to, score, comment)
             VALUES (?, ?, ?, ?, ?)`,
            [ride_id, given_by, given_to, score, comment]
          );
          return {
            status: 'SUCCESS',
            message: `Rating created with ID: ${result.insertId}`
          };
        } catch (err) {
          return {
            status: 'FAILURE',
            message: err.message
          };
        }
      }
    }
  }
};


const wsdlPath = path.join(__dirname, 'rating-service.wsdl');
const wsdl = fs.readFileSync(wsdlPath, 'utf8');


const app = express();

app.listen(3001, () => {
  soap.listen(app, '/soap/rating', ratingService, wsdl);
  console.log('SOAP server running at http://localhost:3001/soap/rating?wsdl');
});
