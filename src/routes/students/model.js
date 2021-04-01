const mongoose = require('mongoose');
const { Schema } = mongoose;

/*
 *
 *
 * SCHEMA
 * 
 * 
 **/
const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  age: Number,
});

/*
 *
 *
 * Methods
 * 
 * 
 **/
studentSchema.methods = {
  fullname() {
    return `${this.name} ${this.lastname}`;
  }
}




/*
 *
 *
 * hooks
 * 
 * 
 **/
studentSchema.pre('save', function() {
  this.name = this.name.toUpperCase();
  this.lastname = this.lastname.toUpperCase();
});

studentSchema.pre('save', function() {
  this.password = this.password;
})

/*
 *
 *
 * MODEL
 * 
 * 
 **/
const studentModel = mongoose.model('Student', studentSchema);


/*
 *
 *
 * Exports
 * 
 * 
 **/
module.exports = {
  schema: studentSchema,
  model: studentModel,
}