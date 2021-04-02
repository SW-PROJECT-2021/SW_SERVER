const express = require('express');
const passport = require('passport');
const router = express.Router();
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
const userController = require('../../controller/userController');

router.get('/fail', (req, res) => {
  return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.SIGN_IN_FAIL));
});

router.get('/testSession', (req, res) => {
  const result = req.session.passport;
  console.log(req.session.passport);
  console.log(result);
  if(!result) {
    return res.send("nono!");
  }
  return res.send(result);
});

router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/user/fail'
  }),
  function (req, res) {
    const { id } = req.body;
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, {
      id
    }));
});

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.USER_LOGOUT));
});

router.post('/signup', userController.signup);

module.exports = router;