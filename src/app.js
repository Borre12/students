/*
 *
 *
 * Environment variables configuration
 * 
 * 
 **/
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config(); // Heroku error
}

const home = require('./routes/home');
const users = require('./routes/users');
const students = require('./routes/students');
const { isAuth } = require('./middlewares/auth');
const mongoose = require('./service/mongo');
const passport = require('./service/passport');
const session = require('express-session');
const flash = require('express-flash');
const express = require('express');
const path = require('path');
const app = express();

/*
 *
 *
 * Use Content Type: application/json by default
 * 
 * 
 **/
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))


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
app.use('', home);
app.use('/accounts', users);
app.use('/students', isAuth, students);

module.exports = app;