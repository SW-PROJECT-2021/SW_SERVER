const express = require('express');
const router = express.Router();
const soldController = require('../../controller/soldController');
const auth = require('../../middlewares/auth');

router.get('/', auth.checkSession, auth.checkAdmin, soldController.getTotalIncome); 
router.get('/search', auth.checkSession, auth.checkAdmin, soldController.getTotalIncomeByDate); 
router.get('/rank/product', auth.checkSession, soldController.getTopProducts); 
router.get('/rank/category', auth.checkSession, auth.checkAdmin, soldController.getTopCategory); 

module.exports = router;