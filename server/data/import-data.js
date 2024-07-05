/*
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
const Review = require('./../../models/reviewModel');
const User = require('./../../models/userModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
*/

// import fs from 'fs'
import mongoose from "mongoose";

const ids = [];

for (let i = 0; i < 40; i++) ids.push({ [i + 1]: new mongoose.Types.ObjectId() });

// console.log(ids);

[
  { 1: new ObjectId("6627f78c7bf884bacdc967c6") },
  { 2: new ObjectId("6627f78c7bf884bacdc967c7") },
  { 3: new ObjectId("6627f78c7bf884bacdc967c8") },
  { 4: new ObjectId("6627f78c7bf884bacdc967c9") },
  { 5: new ObjectId("6627f78c7bf884bacdc967ca") },
  { 6: new ObjectId("6627f78c7bf884bacdc967cb") },
  { 7: new ObjectId("6627f78c7bf884bacdc967cc") },
  { 8: new ObjectId("6627f78c7bf884bacdc967cd") },
  { 9: new ObjectId("6627f78c7bf884bacdc967ce") },
  { 10: new ObjectId("6627f78c7bf884bacdc967cf") },
  { 11: new ObjectId("6627f78c7bf884bacdc967d0") },
  { 12: new ObjectId("6627f78c7bf884bacdc967d1") },
  { 13: new ObjectId("6627f78c7bf884bacdc967d2") },
  { 14: new ObjectId("6627f78c7bf884bacdc967d3") },
  { 15: new ObjectId("6627f78c7bf884bacdc967d4") },
  { 16: new ObjectId("6627f78c7bf884bacdc967d5") },
  { 17: new ObjectId("6627f78c7bf884bacdc967d6") },
  { 18: new ObjectId("6627f78c7bf884bacdc967d7") },
  { 19: new ObjectId("6627f78c7bf884bacdc967d8") },
  { 20: new ObjectId("6627f78c7bf884bacdc967d9") },
  { 21: new ObjectId("6627f78c7bf884bacdc967da") },
  { 22: new ObjectId("6627f78c7bf884bacdc967db") },
  { 23: new ObjectId("6627f78c7bf884bacdc967dc") },
  { 24: new ObjectId("6627f78c7bf884bacdc967dd") },
  { 25: new ObjectId("6627f78c7bf884bacdc967de") },
  { 26: new ObjectId("6627f78c7bf884bacdc967df") },
  { 27: new ObjectId("6627f78c7bf884bacdc967e0") },
  { 28: new ObjectId("6627f78c7bf884bacdc967e1") },
  { 29: new ObjectId("6627f78c7bf884bacdc967e2") },
  { 30: new ObjectId("6627f78c7bf884bacdc967e3") },
  { 31: new ObjectId("6627f78c7bf884bacdc967e4") },
  { 32: new ObjectId("6627f78c7bf884bacdc967e5") },
  { 33: new ObjectId("6627f78c7bf884bacdc967e6") },
  { 34: new ObjectId("6627f78c7bf884bacdc967e7") },
  { 35: new ObjectId("6627f78c7bf884bacdc967e8") },
  { 36: new ObjectId("6627f78c7bf884bacdc967e9") },
  { 37: new ObjectId("6627f78c7bf884bacdc967ea") },
  { 38: new ObjectId("6627f78c7bf884bacdc967eb") },
  { 39: new ObjectId("6627f78c7bf884bacdc967ec") },
  { 40: new ObjectId("6627f78c7bf884bacdc967ed") },
];
