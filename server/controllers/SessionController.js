const models = require('../models/model');

const SessionController = {};


SessionController.authorize = (req, res, next) => {
  if (req.session.userID) {
    models.User.findOne({ _id: req.session.userID })
    .then(user => res.locals.user = user)
    .then( () => next())
  } else {
    console.log('Error session not authorized');
    res.locals.user = 'error in session authorization';
    return next();
  }
}

module.exports = SessionController;