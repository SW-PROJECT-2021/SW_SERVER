const orderHistoryService = require('../service/orderHistoryService');

module.exports = {
    getMyOrder: async (req, res) => {
      const passport = req.decoded;
      const UserId = passport.user.loginId;
  
      await orderHistoryService.findOrderHistory(UserId, res);
  
      return res;
    },
  }