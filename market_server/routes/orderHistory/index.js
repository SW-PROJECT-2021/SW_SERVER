const express = require('express');
const router = express.Router();
const orderHistoryController = require('../../controller/orderHistoryController');
const auth = require('../../middlewares/auth');


router.get('/', auth.checkSession, orderHistoryController.getMyOrder);


module.exports = router;
