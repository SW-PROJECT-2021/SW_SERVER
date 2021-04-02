const userService = require('../service/userService');

module.exports = {
  signup: async (req, res) => {
    const {
      loginId,
      email,
      userName,
      password
    } = req.body;
    const newUser = await userService.signup(loginId, email, userName, password, res);
    
    return res;
  },
  // login: async (req, res) => {
  //   const {
  //     loginId,
  //     password
  //   } = req.body;
  //   const user = await userService.login(email, password, res);
    
  //   return res;
  // },
}