const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const questionMethod = require('../method/questionMethod');
const orderHistoryMethod = require('../method/orderHistoryMethod');

module.exports = {
  registerQuestion: async (
    ProductId,
    OrderHistoryId,
    title,
    detail,
    res) => {
    if (!ProductId || !OrderHistoryId || !title || !detail) {
      console.log('필요값 누락');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    if (title.length > 50) {
      console.log('문의 제목 길이 초과');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.TITLE_TOO_LONG));
    }

    try {
      const question = await questionMethod.registerQuestion(
        ProductId,
        OrderHistoryId,
        title,
        detail);

      question.createdAt.setHours(question.createdAt.getHours() + 9); // 시간 맞추기
      await questionMethod.updateTime(question.id, question.createdAt);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.REGISTER_QUESTION_SUCCESS, question));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.REGISTER_QUESTION_FAIL));

      return;
    }
  },
  registerAnswer: async (
    id,
    answer,
    res) => {
    if (!id || !answer) {
      console.log('필요값 누락');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      await questionMethod.registerAnswer(id, answer);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.REGISTER_ANSWER_SUCCESS, {
        "answerQuestion": id
      }));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.REGISTER_ANSWER_FAIL));

      return;
    }
  },
  getAll: async (res) => {
    try {
      const questions = await questionMethod.getAll();
      const processedQuestions = questions.map(data => data.get({
        plain: true
      }));

      for (let element of processedQuestions) {
        delete element.updatedAt;
        element.ProductName = element.Product.name;
        delete element.Product;
      }
      console.log(processedQuestions);

      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_ALL_QUESTION_SUCCESS, processedQuestions));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_ALL_QUESTION_FAIL));

      return;
    }
  },
  getDetail: async (id, res) => {
    if (!id) {
      console.log('필요값 누락');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      const question = await questionMethod.findById(id);
      console.log(question);

      delete question.updatedAt;
      question.ProductName = question.Product.name;
      delete question.Product;

      const orderHistory = await orderHistoryMethod.searchById(question.OrderHistoryId);
      question.orderDate = orderHistory.orderDate;
      question.orderDestination = orderHistory.orderDestination;

      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_QUESTION_DETAIL_SUCCESS, question));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_QUESTION_DETAIL_FAIL));

      return;
    }
  },
  getQuestions: async (id, res) => {
    if (!id) {
      console.log('필요값 누락');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      const questions = await questionMethod.findByOrderHistoryId(id);
      const processedQuestions = questions.map(data => data.get({
        plain: true
      }));

      for (let element of processedQuestions) {
        delete element.updatedAt;
        element.ProductName = element.Product.name;
        delete element.Product;
      }
      console.log(processedQuestions);

      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_ORDER_QUESTION_SUCCESS, processedQuestions));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_ORDER_QUESTION_FAIL));

      return;
    }
  }
}