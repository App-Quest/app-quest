const Job = require('../models/appQuestModels');

const JobController = {};

JobController.addJob = (req, res, next) => {

  Job.create(req.body,
    (err, job) => {
      if (err) {
        return next(err);
      }
      res.locals.job = job;
      return next();
    });
};

JobController.getJobs = (req, res, next) => {

}