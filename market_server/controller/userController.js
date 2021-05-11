const userService = require('../service/userService');
const passport = require('passport');

module.exports = {
  signup: async (req, res) => {
    const {
      loginId,
      email,
      userName,
      password
    } = req.body;

    await userService.signup(loginId, email, userName, password, res);

    if (res.statusCode == 200) {
      console.log("hello");
      req.session.passport = {
        "user": {
          "loginId": loginId,
          "isAdmin": false
        }
      };
      console.log(req.session);
      req.session.save();
      return res;
    }
  },
  checkIdIfExist: async (req, res) => {
    const {
      id
    } = req.params;
    await userService.checkId(id, res);
    
    return res;
  },
  checkEmailIfExist: async (req, res) => {
    const {
      email
    } = req.params;
    await userService.checkEmail(email, res);

    return res;
  },
}