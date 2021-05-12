const basketService = require('../service/basketService');

module.exports = {
  getMyBasket: async (req, res) => {
    const passport = req.decoded;
    const UserId = passport.user.loginId;

    await basketService.getBasket(UserId, res);

    return res;
  },
  putInMyBasket: async (req, res) => {
    const passport = req.decoded;
    const UserId = passport.user.loginId;

    const {
      count,
      ProductId
    } = req.body;

    await basketService.putIn(UserId, ProductId, count, res);

    return res;
  },
  updateMyBasket: async (req, res) => {
    const passport = req.decoded;
    const UserId = passport.user.loginId;

    const {
      count,
      ProductId
    } = req.body;

    await basketService.update(UserId, ProductId, count, res);

    return res;
  },
  deleteMyBasket: async (req, res) => {
    const passport = req.decoded;
    const UserId = passport.user.loginId;

    const {
      ProductId
    } = req.params;

    await basketService.delete(UserId, ProductId, res);

    return res;
  }
}