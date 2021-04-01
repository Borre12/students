const { model } = require('./model');
const router = require('express').Router();

/*
 *
 *
 * Get All
 * 
 * 
 **/
router.get('', async (req, res) => {
  const students = await model.find();

  res.render('students', { students });
});

/*
 *
 *
 * Get All
 * 
 * 
 **/
router.get('/:studentId', async (req, res) => {
  const studentId = req.params.studentId;

  const student = await model.findById(studentId);

  res.json(student);
});

/*
 *
 *
 * Creat new one
 * 
 * 
 **/
router.post('', async (req, res) => {
  const student = req.body;

  const student_created = await model.create(student);

  req.statusCode = 201;
  res.json(student_created);
});

/*
 *
 *
 * Delete one
 * 
 * 
 **/
router.delete('/:studentId', async (req, res) => {
  const studentId = req.params.studentId;

  const deleted_student = await model.findByIdAndDelete(studentId);

  res.json(deleted_student);
});

module.exports = router;