const {
  Basket
} = require('../models');

module.exports = {
  getBasket: async (UserId) => {
    try {
      const basketObj = await Basket.findAll({
        where: {
          UserId
        }
      });

      return basketObj;
    } catch (err) {
      throw err;
    }
  },
  findInBasket: async (UserId, ProductId) => {
    try {
      const basketObj = await Basket.findOne({
        where: {
          UserId,
          ProductId
        }
      });

      return basketObj;
    } catch (err) {
      throw err;
    }
  },
  putIn: async (UserId, ProductId, count) => {
    try {
      const basketObj = await Basket.create({
        UserId,
        ProductId,
        count
      });

      return basketObj;
    } catch (err) {
      throw err;
    }
  },
  update: async (UserId, ProductId, count) => {
    try {
      await Basket.update({
        count
      }, {
        where: {
          UserId,
          ProductId
        }
      });

    } catch (err) {
      throw err;
    }
  },
  delete: async (UserId, ProductId) => {
    try {
      await Basket.destroy({
        where: {
          ProductId,
          UserId
        }
      });

    } catch (err) {
      throw err;
    }
  },
}