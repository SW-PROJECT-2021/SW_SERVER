const express = require('express');
const router = express.Router();
const upload = require('../../modules/multer');
const bannerController = require('../../controller/bannerController');
const auth = require('../../middlewares/auth');


router.post('/', auth.checkSession, auth.checkAdmin, upload.single('img'), bannerController.registerBanner);
router.get('/select/:id', bannerController.findBannerById);
router.get('/', bannerController.findAllBanner);
router.get('/available', bannerController.availableBanner);

module.exports = router;
