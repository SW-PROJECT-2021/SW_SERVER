const soldService = require('../service/soldService');

module.exports = {
  getTotalIncome: async (req, res) => {
    await soldService.getTotal(res);

    return res;
  },
  getTotalIncomeByDate: async (req, res) => {
    const {
      startDate,
      endDate
    } = req.query;
    await soldService.getTotalByDate(startDate, endDate, res);

    return res;
  },
  getTopProducts: async (req, res) => {
    const {
      startDate,
      endDate
    } = req.query;
    await soldService.getTopProducts(startDate, endDate, res);

    return res;
  },
  getTopCategory: async (req, res) => {
    const {
      startDate,
      endDate
    } = req.query;
    await soldService.getTopCategory(startDate, endDate, res);

    return res;
  },
}