const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const basketMethod = require('../method/basketMethod');
const userMethod = require('../method/userMethod');
const productMethod = require('../method/productMethod');

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
        } else {
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
  putIn: async (UserId, ProductId, count, res) => {
    try {
      const user = await userMethod.readOneLoginId(UserId);
      const userId = user.id;

      if (!ProductId || !count) {
        console.log('필요값 누락');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
      }

      const product = await productMethod.findById(ProductId);
      if (!product) {
        console.log('삭제된 상품');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.DELETED_PRODUCT));
      }

      if (count > product.count) {
        console.log('수량 부족');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.LACK_PRODUCT));
      }

      const element = await basketMethod.findInBasket(userId, ProductId);
      if(element) {
        let plainElement = element.get({plain: true});
        if (plainElement.count + count > product.count) {
          console.log('수량 부족');
          res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.LACK_PRODUCT));

          return;
        }
        plainElement.count += count;
        console.log(plainElement.count);
        await basketMethod.update(userId, ProductId, plainElement.count);
        res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.PUT_IN_BASKET_SUCCESS, plainElement));
      }
      else {
        const myBasket = await basketMethod.putIn(userId, ProductId, count);
        res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.PUT_IN_BASKET_SUCCESS, myBasket));
      }
      
      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.PUT_IN_BASKET_FAIL));

      return;
    }
  },
  update: async (UserId, ProductId, count, res) => {
    try {
      const user = await userMethod.readOneLoginId(UserId);
      const userId = user.id;

      if (!ProductId || !count) {
        console.log('필요값 누락');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
      }

      const product = await productMethod.findById(ProductId);
      if (!product) {
        console.log('삭제된 상품');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.DELETED_PRODUCT));
      }

      if (count > product.count) {
        console.log('수량 부족');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.LACK_PRODUCT));
      }

      if (count < 1) {
        console.log('너무 낮은 Count');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.SO_SMALL_COUNT));
      }

      await basketMethod.update(userId, ProductId, count);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UPDATE_BASKET_SUCCESS, "장바구니 항목 수정 완료"));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_BASKET_FAIL));

      return;
    }
  },
  delete: async (UserId, ProductId, res) => {
    try {
      const user = await userMethod.readOneLoginId(UserId);
      const userId = user.id;

      if (!ProductId) {
        console.log('필요값 누락');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
      }

      const myBasket = await basketMethod.findInBasket(userId, ProductId);
      if(!myBasket) {
        console.log('해당 항목이 존재하지 않습니다.');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_EXIST_ELEMENT));
      }

      await basketMethod.delete(userId, ProductId);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.DELETE_BASKET_SUCCESS, "장바구니 항목 삭제 완료"));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.DELETE_BASKET_FAIL));

      return;
    }
  },
}