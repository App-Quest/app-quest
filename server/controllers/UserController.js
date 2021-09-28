const User = require('../models/appQuestModels');

const UserController = {};

UserController.createUser = (req, res, next) => {

  User.create(req.body,
    (err, user) => {
      if (err) {
        return next(err); // sends errer to global error handler
      }
      res.locals.user = user; // adds user document in locals temp storage to be passed to next middleware, is garbage collected once the req/res cycle is closed out
      return next();
    });
};




module.exports = UserController;