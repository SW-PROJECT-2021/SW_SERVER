const express = require('express');
const router = express.Router();
const reviewController = require('../../controller/reviewController');
const auth = require('../../middlewares/auth');

router.post('/', auth.checkSession, reviewController.registerReview); // API 명세서 추가 필요, 시간 제대로 들어가는지 서버올리고 확인필요
router.get('/:id', auth.checkSession, auth.checkAdmin, reviewController.getReviewsByOrderHistory); // API 명세서 추가 필요

module.exports = router;