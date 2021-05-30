const {
  Orders
} = require('../models');

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
}