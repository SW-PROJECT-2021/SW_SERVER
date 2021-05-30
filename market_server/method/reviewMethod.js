const {
  Review,
  OrderHistory,
  Product
} = require('../models');

module.exports = {
  register: async (
    ProductId,
    OrderHistoryId,
    delivery,
    recommand,
    star,
    detail) => {
    try {
      const review = await Review.create({
        ProductId,
        OrderHistoryId,
        delivery,
        recommand,
        star,
        detail,
      }, {
        plain: true // 사용하기 쉽게!
      });

      return review;
    } catch (err) {
      throw err;
    }
  },
  updateTime: async (id, createdAt) => {
    try {
      const review = await Review.update({
        createdAt,
      }, {
        where: {
          id
        }
      });

      return review;
    } catch (err) {
      throw err;
    }
  },
  findAllByProductId: async (ProductId) => {
    try {
      const review = await Review.findAll({
        include: [{
          model: OrderHistory,
          attributes: ['UserId']
        }],
        where: {
          ProductId
        }
      });

      return review;
    } catch (err) {
      throw err;
    }
  },
  getReview: async (id) => {
    try {
      const reviews = await Review.findAll({
        include: [{
          model: Product,
          attributes: ['name']
        }],
        where: {
          OrderHistoryId : id
        }
      });

      return reviews;
    } catch (err) {
      throw err;
    }
  },
}