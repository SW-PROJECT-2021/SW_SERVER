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

      if (aleadyDestination) {
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
  update: async (
    UserId,
    id,
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

      if (!id || !name || !addressName || !zonecode || !address || !detail || !phone || isDefault == undefined) {
        console.log('필요값 누락');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
      }

      const aleadyDestination = await destMethod.findDest(addressName, userId);

      if (aleadyDestination && aleadyDestination.id != id) {
        console.log('배송지 이미 존재');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.EXIST_DESTINATION));
      }

      if (isDefault) {
        const defaultDest = await destMethod.getDefault(userId);
        if (defaultDest) {
          await destMethod.releaseDefault(defaultDest.id, userId);
        }
      }

      const destination = await destMethod.findDestById(id, userId);
      if (!destination) {
        console.log('존재하지 않는 배송지');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_EXIST_DESTINATION));
      }

      await destMethod.update(
        userId,
        id,
        name,
        addressName,
        zonecode,
        address,
        detail,
        phone,
        isDefault);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UPDATE_DESTINATION_SUCCESS, { "updatedId": id }));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_DESTINATION_FAIL));

      return;
    }
  },
  findById: async (
    id,
    res) => {

    try {
      const Dest = await destMethod.findOne(id);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_DESTINATION_BY_ID_SUCCESS, Dest));

      return;
    } catch (err) {
      //console.log(res);

      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_DESTINATION_BY_ID_FAIL));

      return;
    }
  },
  findAll: async (
    UserId,
    res) => {
    const user = await userMethod.readOneLoginId(UserId);
    const userId = user.id;
    try {
      const MyDestinations = await destMethod.findAll(userId);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_ALL_MY_DESTINATION_SUCCESS, MyDestinations));

      return;
    } catch (err) {
      console.log(res);

      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_ALL_MY_DESTINATION_FAIL));

      return;
    }
  },
  delete: async (
    id,
    res) => {
    try {
      const curDest = await destMethod.findOne(id);
      if (!curDest) {
        console.log('해당 배송지가 존재하지 않습니다.');
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.FIND_DESTINATION_BY_ID_FAIL));

        return;
      }
      await destMethod.delete(id);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.DELETE_DESTINATION_SUCCESS, {
        "deletedId": id
      }));
      return;
    } catch (err) {
      //console.log(res);

      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.DELETE_DESTINATION_FAIL));

      return;
    }
  },
}