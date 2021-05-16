const {
  Destination
} = require('../models');

module.exports = {
  register: async (
    UserId,
    name,
    addressName,
    zonecode,
    address,
    detail,
    phone,
    isDefault) => {
      try {
        const destination = await Destination.create({
          UserId,
          name,
          addressName,
          zonecode,
          address,
          detail,
          phone,
          default: isDefault
        });

        return destination;
      } catch (err) {
        throw err;
      }
  },
  findDest: async (addressName, UserId) => {
    try {
      const destObj = await Destination.findOne({
        where: {
          UserId,
          addressName
        }
      });

      return destObj;
    } catch (err) {
      throw err;
    }
  },
  getDefault: async (UserId) => {
    try {
      const destObj = await Destination.findOne({
        where: {
          UserId,
          default: true
        }
      });

      return destObj;
    } catch (err) {
      throw err;
    }
  },
  releaseDefault: async (id, UserId) => {
    try {
      await Destination.update({
        default: false
      }, {
        where: {
          id,
          UserId
        }
      });
    } catch (err) {
      throw err;
    }
  },
}