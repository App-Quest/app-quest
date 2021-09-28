const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const UserController = require('./controllers/UserController');
const appQuestModel = require('./models/appQuestModels');

// parse inputs
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

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

// send bundle.js
app.use('/build', express.static(path.join(__dirname, '../build')));

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

// // home page route
// app.get('/home', JobController.getJobs, (req, res) => {
//   res.status(200).
// })

// // page not found error handler
app.use((err, req, res, next) => {
  res.setStatus(400).send({ error: err });
});

app.listen(3000, () => {
  console.log('server is running at port 3000');
});
