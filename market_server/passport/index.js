const LocalStrategy = require('passport-local').Strategy;
const userMethod = require('../method/userMethod');
const crypto = require('crypto');

exports.config = (passport) => {
  passport.serializeUser((result, done) => {
    console.log("serializeUser");
    console.log(result);
    done(null, result);
  });

  passport.deserializeUser(async (result, done) => {
    console.log("deserializeUser");
    console.log(result);
    const user = await userMethod.readOneLoginId(result.loginId);
    if (user) {
      done(null, result);
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
      const isAdmin = user.isAdmin;
      const result = {
        loginId,
        isAdmin
      };
      if (inputPassword == user.password) {
        done(null, result);
      } else {
        done(null, false);
      }
    } else {
      done(null, false);
    }
  }))
}