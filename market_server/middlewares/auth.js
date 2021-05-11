const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const userMethod = require('../method/userMethod');

const auth = {
  checkSession: async (req, res, next) => {
    const { passport } = req.session;
    if(!passport) {
      console.log("checkSession => passport Error");
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.UNAUTHORIZED)); 
    }
    const userId = passport.user.loginId;
    if(!userId) {
      console.log("checkSession => userId Error");
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.UNAUTHORIZED)); 
    }
    const user = await userMethod.readOneLoginId(userId);
    if(!user) {
      console.log("checkSession => user Error");
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.UNAUTHORIZED)); 
    }
    req.decoded = passport;
    next();
  },
  checkAdmin: async (req, res, next) => {
    const passport = req.decoded;
    const userId = passport.user.loginId;
    if(!userId) {
      console.log("checkAdmin => userId Error");
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.UNAUTHORIZED)); 
    }
    const user = await userMethod.readOneLoginId(userId);
    if(!user) {
      console.log("checkAdmin => user Error");
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.UNAUTHORIZED)); 
    }
    const isAdmin = user.isAdmin;
    if(!isAdmin) {
      console.log("checkAdmin => no Admin");
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.UNAUTHORIZED)); 
    }
    next();
  }
}

module.exports = auth;