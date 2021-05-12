const {
  User
} = require('../models');
const crypto = require('crypto');

module.exports = {
  readOneLoginId: async (loginId) => {
    try {
      const alreadyUser = await User.findOne({
        where: {
          loginId
        }
      });

      return alreadyUser;
    } catch (err) {
      throw err;
    }
  },
  readOneEmail: async (email) => {
    try {
      const alreadyUser = await User.findOne({
        where: {
          email
        }
      });

      return alreadyUser;
    } catch (err) {
      throw err;
    }
  },
  createUser: async (loginId, email, userName, password) => {
    try {
      const salt = crypto.randomBytes(64).toString('base64');
      const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
      const user = await User.create({
        loginId,
        email,
        password: hashedPassword,
        userName,
        salt,
      });

      return user;
    } catch (err) {
      throw err;
    }
  },
}