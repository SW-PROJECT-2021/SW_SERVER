const {
  Product
} = require('../models');
const {
  Op
} = require("sequelize");

module.exports = {
  register: async (
    name,
    img1,
    img2,
    img3,
    price,
    count,
    CategoryId,
    detail,
    delivery) => {
    try {
      const product = await Product.create({
        name,
        img1,
        img2,
        img3,
        price,
        count,
        CategoryId,
        detail,
        delivery
      });

      return product;
    } catch (err) {
      throw err;
    }
  },
  findById: async (id) => {
    try {
      const product = await Product.findOne({
        where: {
          id,
          // isDeleted : false
        },
        raw: true
      });

      return product;
    } catch (err) {
      throw err;
    }
  },
  findByIdIncludeDel: async (id) => {
    try {
      const product = await Product.findOne({
        where: {
          id,
        }
      });

      return product;
    } catch (err) {
      throw err;
    }
  },
  findAll: async () => {
    try {
      const products = await Product.findAll({
        // where: {
        //   isDeleted: false
        // }
      });

      return products;
    } catch (err) {
      throw err;
    }
  },
  findRecent: async () => {
    try {
      const products = await Product.findAll({
        where: {
          isDeleted: false
        },
        limit: 4,
        order: [
          ['createdAt', 'DESC'],
        ],
      });

      return products;
    } catch (err) {
      throw err;
    }
  },
  findByOneCategory: async (CategoryId) => {
    try {
      const products = await Product.findAll({
        where: {
          CategoryId,
          // isDeleted: false
        }
      });

      return products;
    } catch (err) {
      throw err;
    }
  },
  findAerobic: async () => {
    try {
      const products = await Product.findAll({
        where: {
          CategoryId: {
            [Op.or]: [1, 2]
          },
          // isDeleted: false
        }
      });

      return products;
    } catch (err) {
      throw err;
    }
  },
  findWeight: async () => {
    try {
      const products = await Product.findAll({
        where: {
          CategoryId: {
            [Op.or]: [3, 4, 5, 6]
          },
          // isDeleted: false
        }
      });

      return products;
    } catch (err) {
      throw err;
    }
  },
  findAids: async () => {
    try {
      const products = await Product.findAll({
        where: {
          CategoryId: {
            [Op.or]: [7, 8, 9]
          },
          // isDeleted: false
        }
      });

      return products;
    } catch (err) {
      throw err;
    }
  },
  findMassage: async () => {
    try {
      const products = await Product.findAll({
        where: {
          CategoryId: {
            [Op.or]: [10, 11]
          },
          // isDeleted: false
        }
      });

      return products;
    } catch (err) {
      throw err;
    }
  },
  findAssistant: async () => {
    try {
      const products = await Product.findAll({
        where: {
          CategoryId: {
            [Op.or]: [7, 8, 9, 10, 11]
          },
          // isDeleted: false
        }
      });

      return products;
    } catch (err) {
      throw err;
    }
  },
  search: async (title) => {
    try {
      const products = await Product.findAll({
        where: {
          name: {
            [Op.like]: "%" + title + "%"
          },
          // isDeleted: false
        }
      });

      return products;
    } catch (err) {
      throw err;
    }
  },
  searchDetail: async (
    title,
    minPrice,
    maxPrice,
  ) => {
    try {
      const products = await Product.findAll({
        where: {
          name: {
            [Op.like]: "%" + title + "%"
          },
          price: {
            [Op.lte]: maxPrice,
            [Op.gte]: minPrice
          },
          // isDeleted: false
        }
      });

      return products;
    } catch (err) {
      throw err;
    }
  },
  searchDetailWithCategory: async (
    title,
    CategoryId,
    minPrice,
    maxPrice,
  ) => {
    try {
      const products = await Product.findAll({
        where: {
          name: {
            [Op.like]: "%" + title + "%"
          },
          price: {
            [Op.lte]: maxPrice,
            [Op.gte]: minPrice
          },
          CategoryId,
          // isDeleted: false
        }
      });

      return products;
    } catch (err) {
      throw err;
    }
  },
  update: async (
    id,
    name,
    img1,
    img2,
    img3,
    price,
    count,
    CategoryId,
    detail,
    delivery) => {
    try {
      await Product.update({
        name,
        img1,
        img2,
        img3,
        price,
        count,
        CategoryId,
        detail,
        delivery
      }, {
        where: {
          id
        }
      });
    } catch (err) {
      throw err;
    }
  },
  sell: async (id, count, transaction) => {
    try {
      await Product.update({
        count,
      }, {
        where: {
          id
        },
        transaction
      });
    } catch (err) {
      throw err;
    }
  },
  delete: async (id) => {
    try {
      await Product.update({
        isDeleted: true
      }, {
        where: {
          id
        }
      });
    } catch (err) {
      throw err;
    }
  }
}