const {
  Question,
  OrderHistory,
  Product
} = require('../models');

module.exports = {
  registerQuestion: async (
    ProductId,
    OrderHistoryId,
    title,
    detail) => {
    try {
      const question = await Question.create({
        ProductId,
        OrderHistoryId,
        title,
        detail
      }, {
        plain: true 
      });

      return question;
    } catch (err) {
      throw err;
    }
  },
  updateTime: async (id, createdAt) => {
    try {
      const question = await Question.update({
        createdAt,
      }, {
        where: {
          id
        }
      });

      return question;
    } catch (err) {
      throw err;
    }
  },
  registerAnswer: async (id, answer) => {
    try {
      const question = await Question.update({
        answer,
        isAnswer: true
      }, {
        where: {
          id
        }
      });

      return question;
    } catch (err) {
      throw err;
    }
  },
  getAll: async () => {
    try {
      const questions = await Question.findAll({
        include: [{
          model: Product,
          attributes: ['name']
        }],
        order: [
          ['createdAt', 'DESC'],
        ],
      });

      return questions;
    } catch (err) {
      throw err;
    }
  },
  findById: async (id) => {
    try {
      const question = await Question.findOne({ 
        include: [{
          model: Product,
          attributes: ['name']
        }],
        where: {
          id
        },
        raw: true,
        nest: true,
      });

      return question;
    } catch (err) {
      throw err;
    }
  },
  findByOrderHistoryId: async (OrderHistoryId) => {
    try {
      const questions = await Question.findAll({
        include: [{
          model: Product,
          attributes: ['name']
        }],
        order: [
          ['createdAt', 'DESC'],
        ],
        where: {
          OrderHistoryId
        }
      });

      return questions;
    } catch (err) {
      throw err;
    }
  }
}