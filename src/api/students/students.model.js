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
  lastname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  }
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