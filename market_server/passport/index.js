const LocalStrategy = require('passport-local').Strategy;
const userMethod = require('../method/userMethod');
const crypto = require('crypto');

exports.config = (passport) => {
  passport.serializeUser((loginId, done) => {
    console.log("serializeUser");
    console.log(loginId);
    done(null, loginId);
  });

  passport.deserializeUser((loginId, done) => {
    console.log("deserializeUser");
    console.log(loginId);
    const user = userMethod.readOneLoginId(loginId);
    if (user) {
      done(null, loginId);
    } else {
      done(null, false);
    }
  });

  passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'password'
  }, async (id, password, done) => {
    if (!id || !password) {
      done(null, false);
    }

    const user = await userMethod.readOneLoginId(id);
    if (user) {
      const {
        loginId,
        salt,
      } = user;
      const inputPassword = await crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
      if (inputPassword == user.password) {
        done(null, loginId);
      } else {
        done(null, false);
      }
    } else {
      done(null, false);
    }
  }))
}