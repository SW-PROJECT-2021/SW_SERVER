const destService = require('../service/destService');

module.exports = {
  registerDestination: async (req, res) => {
    const passport = req.decoded;
    const UserId = passport.user.loginId;

    const {
      name,
      addressName,
      zonecode,
      address,
      detail,
      phone,
      isDefault
    } = req.body;

    await destService.register(UserId, name, addressName, zonecode, address, detail, phone, isDefault, res);

    return res;
  }
}