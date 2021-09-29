const User = require('../models/appQuestModels');

// Object.assign(App, req.body)

const defaultApp = {
  company: 'Google',
  location: 'LA',
  resume: 'link',
  dateAdded: 'today',
  dateLastEdited: 'today',
  position: 'Software engineer',
  contact: {
    name: 'name',
    phone: 'phone',
    email: 'email',
  },
  status: 'status',
  priority: 'priority',
  coverLetter: 'coverletter',
  nextSteps: 'next steps',
  notes: 'notes',
  preparation: 'prep', // what steps did you take to prepare? algo practice, sdi practice, mock interviews.. etc
  research: {
    // in case we plug into Ahad team app
    employeeCount: 'count',
    revenue: 'revenue',
    mission: 'mission',
    valueProp: 'valueProp',
    competitors: 'competitors',
    techStack: 'techstack',
  },
  reflection: {
    good: 'good',
    bad: 'bad',
    improvementPlan: 'improveplan',
  },
};

const AppController = {};

AppController.findApplicationPosts = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(async (result) => {
      if (result === null) {
        res.locals.result = 'user not found'
        return next();
      }

      const applicationsArray = result.applicationPosts;
      res.locals.apps = applicationsArray;
      return next();
    })
}

AppController.addApp = (req, res, next) => {

  res.locals.apps.push(Object.assign(defaultApp, req.body))

  // access applicationPosts property -> array
    // update it by pushing in the new AppObject using Object.assign

  User.findOneAndUpdate({ email: req.body.email }, { applicationPosts: res.locals.apps },
    (err, userDoc) => {
      if (err) {
        return next(err);
      }
      res.locals.userDoc = userDoc;
      return next();
    });
};


module.exports = AppController;