const express = require('express');
const passport = require('passport');
const router = express.Router();
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
const userController = require('../../controller/userController');
const userMethod = require('../../method/userMethod');

router.get('/fail', (req, res) => {
  return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.SIGN_IN_FAIL));
});
router.get('/testSession', (req, res) => {
  const result = req.session.passport;
  console.log(result);
  if (!result) {
    return res.send("nono!");
  }
  return res.send(result);
});
router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/user/fail'
  }),
  async (req, res) => {
    const {
      passport
    } = req.session;
    const user = await userMethod.readOneLoginId(passport.user.loginId);
    const result = {
      "loginId": user.loginId,
      "email": user.email,
      "userName": user.userName,
      "isAdmin": user.isAdmin
    };
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS,
      result));
  });
router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.USER_LOGOUT));
});
router.get('/check/id/:id', userController.checkIdIfExist);
router.get('/check/email/:email', userController.checkEmailIfExist);
router.post('/signup', userController.signup);

module.exports = router;