const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const productMethod = require('../method/productMethod');
const categoryMethod = require('../method/categoryMethod');
const reviewMethod = require('../method/reviewMethod');
const review = require('../models/review');
const userMethod = require('../method/userMethod');

module.exports = {
  register: async (
    name,
    imageUrls,
    price,
    count,
    category,
    detail,
    delivery,
    res
  ) => {
    if (!name || imageUrls.length < 1 || !price || !count || !category || !detail || !delivery) {
      console.log('필요값 누락');

      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
      return;
    }
    const img1 = imageUrls[0];
    const img2 = imageUrls[1];
    const img3 = imageUrls[2];
    if (count < 0) {
      console.log('수량이 존재해야합니다.');

      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NEED_COUNT));
      return;
    }

    try {
      const categoryObj = await categoryMethod.findByName(category);
      if (!categoryObj) {
        console.log('해당 카테고리가 존재하지 않습니다.');
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_CATEGORY));

        return;
      }

      const product = await productMethod.register(name, img1, img2, img3, price, count, categoryObj.id, detail, delivery);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.REGISTER_PRODUCT_SUCCESS, product));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.REGISTER_PRODUCT_FAIL));

      return;
    }
  },
  findProduct: async (id, res) => {
    if (!id) {
      console.log('필요값 누락');

      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
      return;
    }

    try {
      const product = await productMethod.findById(id);
      if (!product) {
        console.log("해당 상품이 존재하지 않습니다.");
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_EXIST_PRODUCT));

        return;
      }

      const reivewByProduct = await reviewMethod.findAllByProductId(product.id);
      const reviews = reivewByProduct.map(data => data.get({
        plain: true
      }));
      for (let review of reviews) {
        let userId = review.OrderHistory.UserId;
        const user = await userMethod.findById(userId);
        review.UserId = user.loginId;
        delete review.OrderHistory;
      }
      product.reviews = reviews;

      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_PRODUCT_BY_ID_SUCCESS, product));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_PRODUCT_BY_ID_FAIL));

      return;
    }
  },
  findAll: async (res) => {
    try {
      const products = await productMethod.findAll();
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_ALL_PRODUCTS_SUCCESS, products));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_ALL_PRODUCTS_FAIL));

      return;
    }
  },
  findRecent: async (res) => {
    try {
      const products = await productMethod.findRecent();
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_RECENT_PRODUCTS_SUCCESS, products));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_RECENT_PRODUCTS_FAIL));

      return;
    }
  },
  findByOneCategory: async (category, res) => {
    if (!category) {
      console.log('필요값 누락');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {

      const categoryObj = await categoryMethod.findByName(category);
      if (!categoryObj) {
        console.log('해당 카테고리가 존재하지 않습니다.');
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_CATEGORY));

        return;
      }

      const categoryId = categoryObj.id;
      const products = await productMethod.findByOneCategory(categoryId);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_ALL_PRODUCTS_BY_ONE_CATEGORY_SUCCESS, products));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_ALL_PRODUCTS_BY_ONE_CATEGORY_FAIL));

      return;
    }
  },
  findAerobic: async (res) => {
    try {
      const products = await productMethod.findAerobic();
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_ALL_AEROBIC_SUCCESS, products));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_ALL_AEROBIC_FAIL));

      return;
    }
  },
  findWeight: async (res) => {
    try {
      const products = await productMethod.findWeight();
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_ALL_WEIGHT_SUCCESS, products));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_ALL_WEIGHT_FAIL));

      return;
    }
  },
  findAids: async (res) => {
    try {
      const products = await productMethod.findAids();
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_ALL_AIDS_SUCCESS, products));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_ALL_AIDS_FAIL));

      return;
    }
  },
  findMassage: async (res) => {
    try {
      const products = await productMethod.findMassage();
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_ALL_MASSAGE_SUCCESS, products));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_ALL_MASSAGE_FAIL));

      return;
    }
  },
  findAssistant: async (res) => {
    try {
      const products = await productMethod.findAssistant();
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_ALL_ASSISTANT_SUCCESS, products));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_ALL_ASSISTANT_FAIL));

      return;
    }
  },
  search: async (title, res) => {
    const searchTitle = title.trim();
    try {
      console.log(searchTitle);
      const products = await productMethod.search(searchTitle);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SEARCH_PRODUCT_SUCCESS, products));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SEARCH_PRODUCT_FAIL));

      return;
    }
  },
  searchDetail: async (
    title,
    category,
    minPrice,
    maxPrice,
    res) => {
    const searchTitle = title.trim();
    if (!minPrice) {
      minPrice = -1;
    }
    if (!maxPrice) {
      maxPrice = Number.MAX_SAFE_INTEGER;
    }
    try {
      console.log(searchTitle);
      if (!category) {
        const products = await productMethod.searchDetail(searchTitle, minPrice, maxPrice);
        res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SEARCH_DETAIL_PRODUCT_SUCCESS, products));

        return;
      }
      const categoryObj = await categoryMethod.findByName(category);
      const products = await productMethod.searchDetailWithCategory(searchTitle, categoryObj.id, minPrice, maxPrice);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SEARCH_DETAIL_PRODUCT_SUCCESS, products));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SEARCH_DETAIL_PRODUCT_FAIL));

      return;
    }
  },
  updateProduct: async (
    id,
    name,
    imageUrls,
    price,
    count,
    category,
    detail,
    delivery,
    res) => {
    if (!id || !name || imageUrls.length < 1 || !price || !count || !category || !detail || !delivery) {
      console.log('필요값 누락');

      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    if (count < 0) {
      console.log('수량이 존재해야합니다.');

      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NEED_COUNT));
    }

    try {
      const categoryObj = await categoryMethod.findByName(category);
      if (!categoryObj) {
        console.log('해당 카테고리가 존재하지 않습니다.');
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_CATEGORY));

        return;
      }
      const curProduct = await productMethod.findById(id);
      if (!curProduct) {
        console.log('해당 상품이 존재하지 않습니다.');
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.FIND_PRODUCT_BY_ID_FAIL));

        return;
      }
      const img1 = imageUrls[0];
      const img2 = imageUrls[1];
      const img3 = imageUrls[2];
      await productMethod.update(id, name, img1, img2, img3, price, count, categoryObj.id, detail, delivery);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UPDATE_PRODUCT_SUCCESS, {
        "updatedId": id
      }));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_PRODUCT_FAIL));

      return;
    }
  },
  deleteProduct: async (id, res) => {
    try {
      const curProduct = await productMethod.findById(id);
      if (!curProduct) {
        console.log('해당 상품이 존재하지 않습니다.');
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.FIND_PRODUCT_BY_ID_FAIL));

        return;
      }

      await productMethod.delete(id);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.DELETE_PRODUCT_SUCCESS, {
        "deletedId": id
      }));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.DELETE_PRODUCT_FAIL));

      return;
    }
  },
}