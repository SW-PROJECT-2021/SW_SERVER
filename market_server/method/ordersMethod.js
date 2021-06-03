const {
  Orders,
  Product
} = require('../models');
const {
  sequelize
} = require('../models');
const {
  Op
} = require("sequelize");

module.exports = {
  register: async (orderList, transaction) => {
    try {
      const orders = await Orders.bulkCreate(orderList, {
        transaction
      });

      return orders;
    } catch (err) {
      throw err;
    }
  },
  getOrderByOrderHistory: async (orderIdList) => {
    try {
      const orders = await Orders.findAll({
        attributes: ['ProductId', [sequelize.fn('sum', sequelize.col('productCount')), 'total']],
        where: {
          OrderHistoryId: { [Op.in] : orderIdList }
        },
        group: ['Orders.ProductId'],
        raw: true,
        order: sequelize.literal('total DESC'),
      });

      return orders;
    } catch (err) {
      throw err;
    }
  },
}