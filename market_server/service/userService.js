const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const userMethod = require('../method/userMethod');
const crypto = require('crypto');
const {
  sequelize
} = require('../models');

function CheckEmail(str) {
  const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  if (checkSpace(str)) {
    return false;
  }

  if (!reg_email.test(str)) {
    return false;
  } else {
    return true;
  }
}

function checkSpace(str) {
  if (str.search(/\s/) != -1) {
    return true;
  } else {
    return false;
  }
}

function checkIdPattern(str) {
  const pattern1 = /[0-9]/; // 숫자 
  const pattern2 = /[a-zA-Z]/; // 문자 
  if (checkSpace(str)) {
    return false;
  }
  if (!pattern1.test(str) || !pattern2.test(str) || str.length < 8 || str.length > 20) {
    return false;
  } else {
    return true;
  }
}

function checkPasswordPattern(str) {
  const pattern1 = /[0-9]/; // 숫자 
  const pattern2 = /[a-zA-Z]/; // 문자 
  const pattern3 = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자 
  if (checkSpace(str)) {
    return false;
  }
  if (!pattern1.test(str) || !pattern2.test(str) || !pattern3.test(str) || str.length < 8 || str.length > 20) {
    return false;
  } else {
    return true;
  }
}

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

    if (!checkIdPattern(loginId)) {
      console.log("아이디 생성규칙 불일치");
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.RULE_MISS_MATCH_ID));
      return;
    }
    if (!checkPasswordPattern(password)) {
      console.log("비밀번호 생성규칙 불일치");
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.RULE_MISS_MATCH_PW));
      return;
    }
    if (!CheckEmail(email)) {
      console.log("이메일 생성규칙 불일치");
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.RULE_MISS_MATCH_EMAIL));
      return;
    }

    try {
      const existUserId = await userMethod.readOneLoginId(loginId);
      if (existUserId) {
        console.log('해당 Id 존재');
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));

        return;
      }

      const existUserEmail = await userMethod.readOneEmail(email);
      if (existUserEmail) {
        console.log('해당 Email 존재');
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_EMAIL));

        return;
      }
      const user = await userMethod.createUser(loginId, email, userName, password);

      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_UP_SUCCESS, {
        loginId,
        email,
        userName,
        isAdmin: user.isAdmin
      }));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_UP_FAIL));

      return;
    }
  },
  checkId: async (id, res) => {
    try {
      const user = await userMethod.readOneLoginId(id);
      if (user) {
        console.log('해당 Id 존재');
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));

        return;
      }
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.CHECK_ID_SUCCESS, {
        "checkId": true
      }));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CHECK_ID_FAIL));

      return;
    }
  },
  checkEmail: async (email, res) => {
    try {
      const user = await userMethod.readOneEmail(email);
      if (user) {
        console.log('해당 Email 존재');
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_EMAIL));

        return;
      }
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.CHECK_EMAIL_SUCCESS, {
        "checkEmail": true
      }));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CHECK_EMAIL_FAIL));

      return;
    }
  },
}