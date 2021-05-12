const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const basketMethod = require('../method/basketMethod');
const userMethod = require('../method/userMethod');
const productMethod = require('../method/productMethod');
const {
  sequelize
} = require('../models');

let transaction;

module.exports = {
  getBasket: async (UserId, res) => {
    try {
      const user = await userMethod.readOneLoginId(UserId);
      const userId = user.id;
      
      const myBasket = await basketMethod.getBasket(userId);
      let basketList = myBasket.map(data => data.get({
        plain: true
      }));
      for (let basket of basketList) {
        const productId = basket.ProductId;
        const product = await productMethod.findByIdIncludeDel(productId);
        if (product.isDeleted || product.count <= 0) {
          basket.soldOut = true;
          basket.productCnt = 0;
        }
        else {
          basket.soldOut = false;
          basket.productCnt = product.count;
        }
        basket.productName = product.name;
        basket.productPrice = product.price;
        basket.productImg = product.img;
      }
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_BASKET_SUCCESS, basketList));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_BASKET_FAIL));

      return;
    }
  },
}