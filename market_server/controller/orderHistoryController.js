const {
  User
} = require('../models');
const orderHistoryService = require('../service/orderHistoryService');

module.exports = {
  getMyOrder: async (req, res) => {
    const passport = req.decoded;
    const UserId = passport.user.loginId;

    await orderHistoryService.findOrderHistory(UserId, res);

    return res;
  },
  getAllOrder: async (req, res) => {
    await orderHistoryService.findAllOrder(res);
    return res;
  },
  searchByIdMyOrder: async (req, res) => {
    const {
      id
    } = req.params;
    await orderHistoryService.searchById(id, res);
    return res;
  },
  searchByDateMyOrder: async (req, res) => {
    const passport = req.decoded;
    const UserId = passport.user.loginId;
    const {
      startDate,
      endDate
    } = req.query;

    await orderHistoryService.searchByDate(
      UserId,
      startDate,
      endDate,
      res);

    return res;
  },
  searchByDateAllOrder: async (req, res) => {
    const {
      startDate,
      endDate
    } = req.query;

    await orderHistoryService.searchByDateAll(
      startDate,
      endDate,
      res);

    return res;
  },
  registerOrder: async (req, res) => {
    const passport = req.decoded;
    const UserId = passport.user.loginId;
    const {
      orderDate,
      orderDestination,
      productList, // product의 id와 count를 가진 객체 배열
    } = req.body;

    await orderHistoryService.register(
      UserId,
      orderDate,
      orderDestination,
      productList,
      res);

    return res;
  },
  raiseStatus: async (req, res) => {
    const {
      orderHistoryId,
      productId
    } = req.body;

    await orderHistoryService.raise(
      orderHistoryId,
      productId,
      res);

    return res;
  },

}