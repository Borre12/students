/*
 *
 *
 * Environment variables configuration
 * 
 * 
 **/
if(process.env.NODE_ENV === 'development') {
  require('dotenv').config(); // Heroku error
}

const students = require('./api/students/students.route');
const mongoose = require('./service/mongo');
const express = require('express');
const app = express();

/*
 *
 *
 * Use Content Type: application/json by default
 * 
 * 
 **/
app.use(express.json());

/*
 *
 *
 * Mongo Connection
 * 
 * 
 **/
mongoose.connect(process.env.MONGO_URI, () => {
  console.log('connected to mongo!');
});

/*
 *
 *
 * Routes usage
 * 
 * 
 **/
app.use('/students', students);

module.exports = app;