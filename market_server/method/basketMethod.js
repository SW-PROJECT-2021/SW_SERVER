const {
  Basket
} = require('../models');

module.exports = {
  getBasket: async (UserId, transaction) => {
    try {
      const basketObj = await Basket.findAll({
        where: {
          UserId
        },
        transaction
      });

      return basketObj;
    } catch (err) {
      throw err;
    }
  },
}