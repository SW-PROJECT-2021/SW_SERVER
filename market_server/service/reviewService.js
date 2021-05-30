const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const reviewMethod = require('../method/reviewMethod');

module.exports = {
  register: async (
    ProductId,
    OrderHistoryId,
    delivery,
    recommand,
    star,
    detail,
    res) => {
    if (!ProductId || !OrderHistoryId || !delivery || !recommand || !star || !detail) {
      console.log('필요값 누락');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    if (detail.length > 100) {
      console.log('후기 길이 초과');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.REIVEW_TOO_LONG));
    }

    try {
      const review = await reviewMethod.register(
        ProductId,
        OrderHistoryId,
        delivery,
        recommand,
        star,
        detail);

      review.createdAt.setHours(review.createdAt.getHours() + 9); // 시간 맞추기
      await reviewMethod.updateTime(review.id, review.createdAt);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.REGISTER_REVIEW_SUCCESS, review));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.REGISTER_REVIEW_FAIL));

      return;
    }
  },
  getReview: async (
    id,
    res) => {
    if (!id) {
      console.log('필요값 누락');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      const reviews = await reviewMethod.getReview(id);
      const processedReviews = reviews.map(data => data.get({plain: true}));
      for(let review of processedReviews) {
        review.Product = review.Product.name;
      }
      console.log(processedReviews)

      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_REVIEW_SUCCESS, processedReviews));
      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_REVIEW_FAIL));

      return;
    }
  }
}