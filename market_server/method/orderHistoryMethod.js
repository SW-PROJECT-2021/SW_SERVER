const {
  OrderHistory,
  Product
} = require('../models');
const {
  Op
} = require("sequelize");

module.exports = {
  getMyOrder: async (UserId) => {
    try {
      const orderHistroyObj = await OrderHistory.findAll({
        attributes: {
          exclude: ['UserId']
        },
        include: [{
          model: Product,
          as: 'Ordered',
          attributes: ['id', 'name', 'img1', 'price', 'count', 'isDeleted'],
        }],
        where: {
          UserId
        },
      });

      return orderHistroyObj;
    } catch (err) {
      throw err;
    }
  },
  getAllOrder: async () => {
    try {
      const orderHistroyObj = await OrderHistory.findAll({
        include: [{
          model: Product,
          as: 'Ordered',
          attributes: ['id', 'name', 'img1', 'price', 'count', 'isDeleted'],
        }]
      });

      return orderHistroyObj;
    } catch (err) {
      throw err;
    }
  },
  searchByDate: async (UserId, startDate, endDate) => {
    try {
      const orderHistroyObj = await OrderHistory.findAll({
        attributes: {
          exclude: ['UserId']
        },
        include: [{
          model: Product,
          as: 'Ordered',
          attributes: ['id', 'name', 'img1', 'price', 'count', 'isDeleted'],
        }],
        where: {
          UserId,
          orderDate: {
            [Op.lte]: endDate,
            [Op.gte]: startDate,
          }
        },
      });

      return orderHistroyObj;
    } catch (err) {
      throw err;
    }
  },
  searchByDateAll: async (startDate, endDate) => {
    try {
      const orderHistroyObj = await OrderHistory.findAll({
        include: [{
          model: Product,
          as: 'Ordered',
          attributes: ['id', 'name', 'img1', 'price', 'count', 'isDeleted'],
        }],
        where: {
          orderDate: {
            [Op.lte]: endDate,
            [Op.gte]: startDate,
          }
        },
      });

      return orderHistroyObj;
    } catch (err) {
      throw err;
    }
  },
  register: async (UserId, orderDate, orderDestination, transaction) => {
    try {
      const orders = await OrderHistory.create({
        UserId,
        orderDate,
        orderDestination,
        orderStatus: 1
      }, transaction);

      return orders;
    } catch (err) {
      throw err;
    }
  },
}