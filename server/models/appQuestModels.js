const mongoose = require('mongoose');

// mongoose
//   .connect(MONGO_URI, {
//     // options for the connect method to parse the URI
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // sets the name of the DB that our collections are part of
//     // dbName: 'Vacation', //<- change to the name of the database created with AtlasDB
//   })
//   .then((data) => console.log('Connected to Mongo DB.'))
//   .catch((err) => {
//     console.log(err);
//     console.log('Error with the mongoose connection within mongoose.connect.');
//   });

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;
// const bcrypt = require('bcryptjs');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  applicationPosts: [
    // an array of objects.
    {
      company: {
        type: String,
        required: true,
      },
      location: String,
      resume: String,
      dateAdded: Date,
      dateLastEdited: Date,
      position: String,
      contactName: String,
      contactPhone: String,
      contactEmail: String,
      status: String,
      priority: String,
      coverLetter: String,
      nextSteps: String,
      notes: String,
      preparation: String, // what steps did you take to prepare? algo practice, sdi practice, mock interviews.. etc
      // in case we plug into Ahad team app
      researchEmployeeCount: String,
      researchRevenue: String,
      researchMission: String,
      researchValueProp: String,
      researchCompetitors: String,
      researchTechStack: String,
      reflectionGood: String,
      reflectionBad: String,
      reflectionImprovementPlan: String,
    },
  ],
});

userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next('Error in userSchema.pre: ' + JSON.stringify(err));
    this.password = hash;
    return next();
  });
});

const User = mongoose.model('user', userSchema);
// const Job = mongoose.model('job', userSchema.applicationPosts)

// the testSchema was made to test the database before setting up login and signup functionality
// const testSchema = new Schema({
//   test: String,
// });

// const Test = mongoose.model('test', testSchema);

module.exports = User;
