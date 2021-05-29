const express = require('express');
const router = express.Router();
const orderHistoryController = require('../../controller/orderHistoryController');
const auth = require('../../middlewares/auth');


router.get('/', auth.checkSession, orderHistoryController.getMyOrder);
router.get('/all', auth.checkSession, auth.checkAdmin, orderHistoryController.getAllOrder);
router.post('/', auth.checkSession, orderHistoryController.registerOrder);
router.get('/:id', auth.checkSession, orderHistoryController.searchByIdMyOrder);
router.get('/search', auth.checkSession, orderHistoryController.searchByDateMyOrder);
router.get('/search/all', auth.checkSession, auth.checkAdmin, orderHistoryController.searchByDateAllOrder);

router.put('/raiseStatus', auth.checkSession, orderHistoryController.raiseStatus);


module.exports = router;
