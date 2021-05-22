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
  },
  updateDestination: async (req, res) => {
    const passport = req.decoded;
    const UserId = passport.user.loginId;

    const {
      id,
      name,
      addressName,
      zonecode,
      address,
      detail,
      phone,
      isDefault
    } = req.body;

    await destService.update(UserId, id, name, addressName, zonecode, address, detail, phone, isDefault, res);

    return res;
  },
  getByDestination: async (req, res) => {
    const {
      id
    } = req.params;


    await destService.findById(id, res);

    return res;
  },
  getDestination: async (req, res) => {
    const passport = req.decoded;
    const UserId = passport.user.loginId;

    await destService.findAll(UserId, res);

    return res;
  },
  deleteDestination: async (req, res) => {
    const {
      id
    } = req.params;

    console.log(id);
    await destService.delete(id, res);

    return res;
  },
}