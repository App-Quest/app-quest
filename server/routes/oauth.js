const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // may need to add a User.findOne function
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '881497402639-8t295lusfd26cc0c3u3cib8qq2ais2r9.apps.googleusercontent.com',
      clientSecret: 'L2VUc5_O-gpjlTXG4unBgaPY',
      callbackURL: 'http://localhost:8080/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // use the profile info to check if the user is registered 
        // console.log('This is the profile from Google: ', profile);
        return done(null, profile);
    }
  )
);

module.exports = passport;