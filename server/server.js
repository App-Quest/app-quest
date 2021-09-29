const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const auth = require('./routes/oauth');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const UserController = require('./controllers/UserController');
const AppController = require('./controllers/AppController');
const appQuestModel = require('./models/appQuestModels');

// parse inputs
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// set session cookies
app.use(
  cookieSession({
    name: 'app-quest',
    keys: ['keys1', 'keys2'],
  })
);

// send bundle.js
app.use('/build', express.static(path.join(__dirname, '../build')));

app.use(passport.initialize());
app.use(passport.session());

// validating if users are logged in
const isLoggedIn = (req, res, next) => {
  if (req.user || res.cookie){
    next();
  } else {
    res.sendStatus(401);
  }
};

app.get('/failed', (req, res) => res.send('Login failed'));

app.get('/loggedIn', isLoggedIn, (req, res) => {
  console.log('This is printing after isLoggedIn: ',req.user);
  res.send(`Welcome ${req.user.displayName}`);
});

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res){
    res.redirect('/')
    console.log('response after the redirect:', res.user);
    console.log('Everything after THIS is not from the response!!!')
  }
  // function (req, res, next) {
  //   console.log('This is the req.user: ',req.user);
  //   req.body.email = req.user._json.email;
  //   req.body.password = req.user._json.sub;
  //   return next();
  // },
  // userController.findUser,
  // function (req, res, next) {
  //   if (res.locals.userFound) {
  //     console.log('user found');
  //     res.redirect('/dashboard');
  //   }
  //   next();
  // },
  // userController.addUser,
  // function (req, res) {
  //   res.redirect('/dashboard');
  // }
);

// direct here to destroy cookies
app.get('/logOut', (req, res) => {
  // req.session = null;
  delete req.user;
  req.logout();
  delete res.cookie;
  res.clearCookie('username');
  res.redirect('/');
});


const username = 'AppQuestTeam';
const password = 'all3GotHired';
const cluster = 'AppQuest';
const dbname = 'AppQuest';

const MONGO_URI = `mongodb+srv://${username}:${password}@${cluster}.bhedd.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: ')); // event listener for error connecting to mongodb
db.once('open', () => {
  console.log('Connected to MongoDB');
}); // event listener for connecting to mongodb

// leveraging express routes to group together user related routes
// const userRouter = express.Router();
// app.use('/user', userRouter);


// Send entrypoint
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// create user in the database
app.post('/signup', UserController.createUser, (req, res) => {
  // send back user
  // console.log('check on user info: ', res.locals.user)
  res.status(200).json(res.locals.user);
});

app.post('/signin', UserController.verifyUser, (req, res) => {
  console.log('made it into signin route response');
  res.status(200).json(res.locals.result);
});

app.post(
  '/apps',
  AppController.findApplicationPosts,
  AppController.addApp,
  (req, res) => {
    res.status(200).json(res.locals.userDoc);
  }
);

app.get('/apps', AppController.findApplicationPosts, (req, res) => {
  res.status(200).json({ applicationPosts: res.locals.apps });
});

// // home page route
// app.get('/home', JobController.getJobs, (req, res) => {
//   res.status(200).
// })

// // page not found error handler
// app.use((err, req, res, next) => {
//   res.setStatus(400).send({ error: err });
// });

app.listen(3000, () => {
  console.log('server is running at port 3000');
});
