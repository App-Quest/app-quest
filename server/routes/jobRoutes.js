const express = require('express');
const userModel = require('./models');
const app = express();
const jobRouter = express.Router();

// // no job
// // get job application lists
// jobRouter.get('/', JobController.getJobs, (req, res) => {
//   res.json(res.locals.jobs);
// });

