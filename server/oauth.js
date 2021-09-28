const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '881497402639-8t295lusfd26cc0c3u3cib8qq2ais2r9.apps.googleusercontent.com',
      clientSecret: 'L2VUc5_O-gpjlTXG4unBgaPY',
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);

module.exports = passport;