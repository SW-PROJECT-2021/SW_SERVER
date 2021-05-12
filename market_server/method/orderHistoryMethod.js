const {
    OrderHistory
} = require('../models');
const {
    Op
} = require("sequelize");

module.exports = {
    getOrderHistory: async (UserId, transaction) => {
      try {
        const orderHistroyObj = await OrderHistory.findAll({
          where: {
            UserId
          },
          transaction
        });
  
        return orderHistroyObj;
      } catch (err) {
        throw err;
      }
    },
  }