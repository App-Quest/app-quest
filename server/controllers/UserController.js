const User = require('../models/appQuestModels');
const bcrypt = require('bcrypt');

const UserController = {};

UserController.createUser = (req, res, next) => {

  User.create(req.body,
    (err, user) => {
      if (err) {
        return next(err); // sends errer to global error handler
      }
      res.cookie('email', req.body.email);
      res.locals.user = user; // adds user document in locals temp storage to be passed to next middleware, is garbage collected once the req/res cycle is closed out
      return next();
    });
};

UserController.verifyUser = (req, res, next) => {
  res.locals.userFound = false;

  User.findOne({ email: req.body.email })
    .then( async (result) => {
      console.log('result of user.findOne: ', result);
      // if user email not found
      if (result === null) {
        res.locals.result = 'Invalid email/password';
        return next();
      }
      // res.locals.userFound = true;
      // res.cookie('email', req.body.email)
      
      // if user email found and passwords match
      const passwordsMatch = await bcrypt.compare(req.body.password, result.password).then((result) => result);
      if (passwordsMatch) {
        //  req.session.userID = result._id;
        //  req.session.email = result.email;
        //  console.log(req.session, 'session after id and email set');
        // res.locals.userFound = true;
        // res.cookie('email', req.body.email);
        // set result on locals to be the result of
        res.locals.result = result;
        return next();
      }

      console.log('result after invalid password: ', res.locals.result)
      res.locals.result = 'Invalid email/password';
      return next();
    })
    .catch((err) => next({ message: `UserController.verifyUser: Error: ${err}` }));
};


UserController.addApp = (req, res, next) => {
  const newApp = User.applicationPosts
}



module.exports = UserController;