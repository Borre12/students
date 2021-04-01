const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { Schema } = mongoose;

/*
 *
 *
 * SCHEMA
 * 
 * 
 **/
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
});

/*
 *
 *
 * methods
 * 
 * 
 **/
userSchema.methods = {
  isValidPassword(password) {
    return bcrypt.compareSync(password.replace(' ', ''), this.password);
  }
}

/*
 *
 *
 * hooks
 * 
 * 
 **/
userSchema.pre('save', function() {
  this.password = bcrypt.hashSync(this.password.replace(' ', ''), 10);
})

/*
 *
 *
 * MODEL
 * 
 * 
 **/
const userModel = mongoose.model('User', userSchema);


/*
 *
 *
 * Exports
 * 
 * 
 **/
module.exports = {
  schema: userSchema,
  model: userModel,
}