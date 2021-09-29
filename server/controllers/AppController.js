const User = require('../models/appQuestModels');

// Object.assign(App, req.body)

// const defaultApp = {
//   company: 'Google',
//   location: 'LA',
//   resume: 'link',
//   dateAdded: 'today',
//   dateLastEdited: 'today',
//   position: 'Software engineer',
//   contactName: 'name',
//   contactPhone: 'phone',
//   contactEmail: 'email',
//   status: 'status',
//   priority: 'priority',
//   coverLetter: 'coverletter',
//   nextSteps: 'next steps',
//   notes: 'notes',
//   preparation: 'prep', // what steps did you take to prepare? algo practice, sdi practice, mock interviews.. etc
//   // in case we plug into Ahad team app
//   researchEmployeeCount: 'count',
//   researchRevenue: 'revenue',
//   researchMission: 'mission',
//   researchValueProp: 'valueProp',
//   researchCompetitors: 'competitors',
//   researchTechStack: 'techstack',
//   reflectionGood: 'good',
//   reflectionBad: 'bad',
//   reflectionImprovementPlan: 'improveplan',
// };

const AppController = {};

AppController.findApplicationPosts = (req, res, next) => {
  User.findOne({ email: req.body.email }).then(async (result) => {
    if (result === null) {
      res.locals.result = 'user not found';
      return next();
    }

    const applicationsArray = result.applicationPosts;
    res.locals.apps = applicationsArray;
    return next();
  });
};

AppController.addApp = (req, res, next) => {
  res.locals.apps.push(Object.assign(defaultApp, req.body.application));

  // access applicationPosts property -> array
  // update it by pushing in the new AppObject using Object.assign

  User.findOneAndUpdate(
    { email: req.body.email },
    { applicationPosts: res.locals.apps },
    (err, userDoc) => {
      if (err) {
        return next(err);
      }
      res.locals.userDoc = userDoc;
      return next();
    }
  );
};

module.exports = AppController;
