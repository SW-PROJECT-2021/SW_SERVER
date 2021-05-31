const questionService = require('../service/questionService');

module.exports = {
  registerQuestion: async (req, res) => {
    const {
      ProductId,
      OrderHistoryId,
      title,
      detail,
    } = req.body;

    await questionService.registerQuestion(
      ProductId,
      OrderHistoryId,
      title,
      detail,
      res);

    return res;
  },
  registerAnswer: async (req, res) => {
    const {
      id,
      answer,
    } = req.body;

    await questionService.registerAnswer(
      id,
      answer,
      res);

    return res;
  },
  getAllQuestion: async (req, res) => {
    await questionService.getAll(res);

    return res;
  },
  getMyQuestion: async (req, res) => {
    const {
      id // OrderHistoryId
    } = req.params;
    
    await questionService.getQuestions(id, res);

    return res;
  },
  getQuestionDetail: async (req, res) => {
    const {
      id
    } = req.params;

    await questionService.getDetail(id, res);

    return res;
  },
}