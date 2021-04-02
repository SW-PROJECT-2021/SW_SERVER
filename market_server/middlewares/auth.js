const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const userMethod = require('../method/userMethod');

const auth = {
  checkSession: async (req, res, next) => {
    const { passport } = req.session;
    if(!passport) {
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.UNAUTHORIZED)); 
    }
    const userId = passport.user;
    if(!userId) {
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.UNAUTHORIZED)); 
    }
    const user = await userMethod.readOneLoginId(userId);
    if(!user) {
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.UNAUTHORIZED)); 
    }
    req.decoded = userId;
    next();
  },
  checkAdmin: async (req, res, next) => {
    const userId = req.decoded;
    if(!userId) {
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.UNAUTHORIZED)); 
    }
    const user = await userMethod.readOneLoginId(userId);
    if(!user) {
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.UNAUTHORIZED)); 
    }
    const isAdmin = user.isAdmin;
    if(!isAdmin) {
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.UNAUTHORIZED)); 
    }
    next();
  }
}

module.exports = auth;