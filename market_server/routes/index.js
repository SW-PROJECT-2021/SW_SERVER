var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth')

router.use('/user', require('./user'));
router.use('/test', auth.checkSession, require('./test'));
router.use('/multer', auth.checkSession, auth.checkAdmin, require('./multer'));
router.use('/product', require('./product'));
router.use('/banner', require('./banner'));
router.use('/basket', require('./basket'));
router.use('/orderHistory', require('./orderHistory'));
router.use('/dest', require('./destination'));
router.use('/coupon', require('./coupon'));
router.use('/review', require('./review'));
router.use('/question', require('./question'));

module.exports = router;
