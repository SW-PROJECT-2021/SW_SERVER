const reviewService = require('../service/reviewService');

module.exports = {
  registerReview: async (req, res) => {
    const {
      ProductId,
      OrderHistoryId,
      delivery,
      recommand,
      star,
      detail
    } = req.body;

    await reviewService.register(
      ProductId,
      OrderHistoryId,
      delivery,
      recommand,
      star,
      detail,
      res);

    return res;
  },
  getReviewsByOrderHistory: async (req, res) => {
    const {
      id, // orderHistoryId
    } = req.params;

    await reviewService.getReview(
      id,
      res);

    return res;
  },
}