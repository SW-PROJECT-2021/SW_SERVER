var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');

router.use('/api/user', require('./user'));
router.use('/api/test', auth.checkSession, require('./test'));
router.use('/api/multer', auth.checkSession, auth.checkAdmin, require('./multer'));
router.use('/api/product', require('./product'));
router.use('/api/banner', require('./banner'));
router.use('/api/basket', require('./basket'));
router.use('/api/orderHistory', require('./orderHistory'));

module.exports = router;
