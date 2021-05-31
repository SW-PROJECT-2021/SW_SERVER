const {
  Category
} = require('../models');

module.exports = {
  findByName: async (category) => {
    try {
      const categoryObj = await Category.findOne({
        where: {
          title: category
        }
      });

      return categoryObj;
    } catch (err) {
      throw err;
    }
  },
  findById: async (id) => {
    try {
      const categoryObj = await Category.findOne({
        where: {
          id
        }
      });

      return categoryObj;
    } catch (err) {
      throw err;
    }
  },
}