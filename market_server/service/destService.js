const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const destMethod = require('../method/destMethod');
const userMethod = require('../method/userMethod');

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

      if (!name || !addressName || !zonecode || !address || !detail || !phone || isDefault == undefined) {
        console.log('필요값 누락');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
      }

      const aleadyDestination = await destMethod.findDest(addressName, userId);

      if(aleadyDestination) {
        console.log('배송지 이미 존재');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.EXIST_DESTINATION));
      }

      if (isDefault) {
        const defaultDest = await destMethod.getDefault(userId);
        if (defaultDest) {
          await destMethod.releaseDefault(defaultDest.id, userId);
        }
      }

      const destination = await destMethod.register(
        userId,
        name,
        addressName,
        zonecode,
        address,
        detail,
        phone,
        isDefault);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.ADD_DESTINATION_SUCCESS, destination));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.ADD_DESTINATION_FAIL));

      return;
    }
  },
}