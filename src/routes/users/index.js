const { isNoAuth } = require('../../middlewares/auth');
const passport = require('../../service/passport');

const router = require('express').Router();

router.get('/login', isNoAuth, (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('login', {
  successRedirect: '/students',
  failureRedirect: '/accounts/login',
  failureFlash: true,
}));

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', passport.authenticate('register', {
  successRedirect: '/students',
  failureRedirect: '/accounts/register',
  failureFlash: true,
}));

module.exports = router;