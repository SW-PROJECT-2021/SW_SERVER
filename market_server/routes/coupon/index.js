const express = require('express');
const router = express.Router();
const couponController = require('../../controller/couponController');
const auth = require('../../middlewares/auth');


router.post('/', auth.checkSession, auth.checkAdmin, couponController.registerCoupon);
router.post('/issue', auth.checkSession, auth.checkAdmin, couponController.issueAll);
router.post('/issue/user', auth.checkSession, auth.checkAdmin, couponController.isesueUser);
router.get('/all', auth.checkSession, couponController.getAllCoupon);
router.get('/isAvailable/:code', auth.checkSession, couponController.isTrueCoupon);
router.get('/search/user', auth.checkSession, couponController.searchAvailableUser);
router.get('/search/coupon', auth.checkSession, couponController.searchAvailableCoupon);
router.delete('/delete/:id', auth.checkSession, auth.checkAdmin, couponController.deleteCoupon);
module.exports = router;
