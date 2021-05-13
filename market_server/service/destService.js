const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const destMethod = require('../method/basketMethod');

module.exports = {
  register: async (
    UserId,
    name,
    addressName,
    zonecode,
    address,
    detail,
    phone,
    isDefault,
    res) => {
    try {
      const user = await userMethod.readOneLoginId(UserId);
      const userId = user.id;

      if (!name || !addressName || !zonecode || !address || !detail || !phone || !isDefault) {
        console.log('필요값 누락');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
      }
      
      // 이 밑 수정 필요!
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
      if (element) {
        let plainElement = element.get({
          plain: true
        });
        if (plainElement.count + count > product.count) {
          console.log('수량 부족');
          res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.LACK_PRODUCT));

          return;
        }
        plainElement.count += count;
        console.log(plainElement.count);
        await basketMethod.update(userId, ProductId, plainElement.count);
        res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.PUT_IN_BASKET_SUCCESS, plainElement));
      } else {
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
}