const express = require('express');
const router = express.Router();
const basketController= require('../../controller/basketController');
const auth = require('../../middlewares/auth');

router.get('/', auth.checkSession, basketController.getMyBasket);

module.exports = router;