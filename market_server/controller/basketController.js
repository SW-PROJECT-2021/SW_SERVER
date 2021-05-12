const basketService = require('../service/basketService');

module.exports = {
  getMyBasket: async (req, res) => {
    const passport = req.decoded;
    const UserId = passport.user.loginId;

    await basketService.getBasket(UserId, res);

    return res;
  },
}