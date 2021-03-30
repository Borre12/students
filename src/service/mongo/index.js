const mongoose = require('mongoose');

/*
 *
 *
 * Mongo Connection Configuration
 * 
 * 
 **/
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connection.on('error', err => {
  console.log('An error ocurrer attempting to connect to mongo :c');
  console.log(err);
});

module.exports = mongoose;