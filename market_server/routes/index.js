var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');

router.use('/user', require('./user'));
router.use('/test', auth.checkSession, require('./test'));
router.use('/multer', auth.checkSession, auth.checkAdmin, require('./multer'));
router.use('/product', require('./product'));
router.use('/basket', require('./basket'));

module.exports = router;