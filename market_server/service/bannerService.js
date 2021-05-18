const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const bannerMethod = require('../method/bannerMethod');


const {
  sequelize
} = require('../models');
const { BAD_REQUEST } = require('../modules/statusCode');
const { Utils } = require('sequelize');

module.exports = {
  register: async (
    name,
    imgFile,
    startDate,
    endDate,
    detail,
    res
  ) => {
    if (!name || !imgFile || !startDate || !endDate || !detail) {
      console.log('필요값 누락');

      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
      return;
    }
    try {

      const banner = await bannerMethod.register(name, imgFile.location, startDate, endDate, detail);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.REGISTER_BANNER_SUCCESS, banner));

      return res;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.REGISTER_BANNER_FAIL));
      return;
    }
  },
  findBanner: async (id, res) => {
    if (!id) {
      console.log('필요값 누락');

      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
      return;
    }

    try {
      const banner = await bannerMethod.findById(id);
      if (!banner) {
        console.log("해당 배너가 존재하지 않습니다.");
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_EXIST_BANNER));

        return;
      }

      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_BANNER_BY_ID_SUCCESS, banner));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_BANNER_BY_ID_FAIL));

      return;
    }
  },
  findAll: async (res) => {
    try {
      const banners = await bannerMethod.findAll();
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_ALL_BANNER_SUCCESS, banners));

      return;
    } catch (err) {
      console.log(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_ALL_BANNER_FAIL));

      return;
    }
  },
  available: async (res) => {
    try {
      const banners = await bannerMethod.availableBanner();
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_AVAILABLE_BANNER_SUCCESS, banners));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_AVAILABLE_BANNER_FAIL));

      return;
    }

  },
  updateBanner: async (
    id,
    name,
    imgFile,
    startDate,
    endDate,
    detail,
    res
  ) => {
    if (!name || !imgFile || !startDate || !endDate || !detail) {
      console.log('필요값 누락');

      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
      return
    }

    try {
      const curBanner = await bannerMethod.findById(id);
      if (!curBanner) {
        console.log("해당 banner가 존재하지 않습니다.");
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.FIND_BANNER_BY_ID_FAIL));

        return;
      }


      const banner = await bannerMethod.update(id, name, imgFile.location, startDate, endDate, detail);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UPDATE_BANNER_SUCCESS, {
        "updatedId": id
      }));
      return;
    }
    catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_BANNER_FAIL));

      return;
    }

  },
  searchByDate: async (startDate, res) => {
    if (!startDate) {
      console.log('필요값 누락');

      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
      return;
    }
    try {
      const banners = await bannerMethod.searchDate(startDate);
      if (!banners) {
        console.log("해당 배너가 존재하지 않습니다.");
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_EXIST_BANNER));

        return;
      }
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SEARCH_BANNER_BY_STARRTDATE_SUCCESS, banners));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SEARCH_BANNER_BY_STARRTDATE_FAIL));

      return;
    }
  },
  sortBanner: async (
    sort,
    direction,
    res
  ) => {
    if (!sort || !direction) {
      console.log("필요값 누락");

      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
      return;
    }
    if (sort != 'id' && sort != 'bannerStartDate' && sort != 'bannerEndDate' && sort != 'updatedAt' && sort != 'createdAt') {
      console.log("잘못된 sort");

      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE));
      return;
    }
    if (direction != 'DESC' && direction != 'ASC') {
      console.log("잘못된 direction");

      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE));
      return;
    }

    try {
      const banner = await bannerMethod.sortBanner(sort, direction);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SORT_BANNER_SUCCESS, banner));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SORT_BANNER_FAIL));

    }
  },
}