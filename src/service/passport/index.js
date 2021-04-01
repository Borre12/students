const { model: User } = require('../../routes/users/model');
const passport = require('passport');
const LocalStrategy = require('passport-local');


/*
 *
 *
 * Login
 * 
 * 
 **/
passport.use('login', new LocalStrategy((username, password, done) => {
  User.findOne({'username': username})
  .then((user) => {
    if(!user) {
      return done(null, false, { message: 'User not found.' });
    } else if (!user.isValidPassword(password)) {
      return done(null, false, { message: 'Invalid password' });
    }

    return done(null, user);
  })
  .catch((err) => {
    return done(err);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});


/*
 *
 *
 * Register
 * 
 * 
 **/
passport.use('register', new LocalStrategy({ passReqToCallback: true }, function(req, username, password, done) {
  User.findOne({'username': username})
  .then((user) => {
    if(user) {
      return done(null, false, { message: 'User already exists.' });
    } else {
      const newUser = new User();
      newUser.username = username;
      newUser.email = req.body.email;
      newUser.password = password;

      newUser.save(function(err) {
        if(!err) {
          return done(null, newUser);
        } else {
          return done(err);
        }
      });
    }
  })
  .catch(err => done(err));
}));

module.exports = passport;