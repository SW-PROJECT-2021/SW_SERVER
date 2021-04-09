const {
  Category
} = require('../models');

module.exports = {
  findByName: async (category, transaction) => {
    try {
      const categoryObj = await Category.findOne({
        where: {
          title: category
        },
        transaction
      });

      return categoryObj;
    } catch (err) {
      throw err;
    }
  },
}