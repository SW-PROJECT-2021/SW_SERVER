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
  // getOrder: async (OrderHistoryId, ProductId) => {
  //   try {
  //     const order = await Orders.findOne({
  //       where: {
  //         ProductId,
  //         OrderHistoryId
  //       },
  //     });

<<<<<<< HEAD
  //     return order;
  //   } catch (err) {
  //     throw err;
  //   }
  // },
=======
      return order;
    } catch (err) {
      throw err;
    }
  },
  raise: async (OrderHistoryId, ProductId, status) => {
    try {
      const orders = await Orders.update({
        status
      }, {
        where: {
          OrderHistoryId,
          ProductId
        }
      });
      return orders;
    } catch (err) {
      throw err;
    }
  },
>>>>>>> 9e911ba8c73ceb19d4047901315d59bc7dea7083
}