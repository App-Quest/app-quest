const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const oauth = require('./oauth')
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

// parse inputs
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// send bundle.js
app.use('/build', express.static(path.join(__dirname, '../build')));

// Send entrypoint
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.listen(3000);
