const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const userMethod = require('../method/userMethod');
const crypto = require('crypto');
const {
  sequelize
} = require('../models');

let transaction;

module.exports = {
  signup: async (
    loginId,
    email,
    userName,
    password,
    res
  ) => {
    if (!loginId || !email || !userName || !password) {
      console.log('필요값 누락');
      
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    
    try {
      transaction = await sequelize.transaction();

      const existUserId = await userMethod.readOneLoginId(loginId);
      if(existUserId) {
        console.log('해당 Id 존재');
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
        return;
      }

      const existUserEmail = await userMethod.readOneEmail(email);
      if(existUserEmail) {
        console.log('해당 Email 존재');

        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_EMAIL));
        return;
      }
      const user = await userMethod.createUser(loginId, email, userName, password, transaction);
      
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_UP_SUCCESS, {
        loginId,
        email,
        userName,
        password
      }));
      transaction.commit();
      return;
    } catch (err) {
      console.error(err);
      if (transaction) await transaction.rollback();

      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_UP_FAIL));
      return;
    }
  },
  // login: async (loginId, password, res) => {
  //   if (!loginId || !password) {
  //     console.log('필요값 누락');

  //     res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  //     return;
  //   }
  //   try {
  //     const user = await userMethod.readOneLoginId(loginId);
  //     if (!user) {
  //       console.log('없는 ID');

  //       res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  //       return;
  //     }
  //     const {
  //       loginId,
  //       salt,
  //       password
  //     } = user;
  //     const inputPassword = await crypto.pbkdf2Sync(logPassword, salt, 10000, 64, 'sha512').toString('base64');
  //     if (inputPassword !== password) {
  //       console.log('비밀번호가 일치하지 않음');

  //       res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
  //       return;
  //     }

  //     res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, {
  //       loginId,
  //       email,
  //       userName,
  //     }));
  //     return;
  //   } catch (err) {
  //     console.log(err);

  //     res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_IN_FAIL));
  //     return;
  //   }
  // }
}