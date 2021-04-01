const isAuth = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/accounts/login');
}

const isNoAuth = (req, res, next) => {
  if(req.isAuthenticated()) {
    res.redirect('/students');
  } else return next();
}

module.exports = {
  isAuth, isNoAuth
}