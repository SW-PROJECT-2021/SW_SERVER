const express = require('express');
const router = express.Router();
const upload = require('../../modules/multer');
const bannerController = require('../../controller/bannerController');
const auth = require('../../middlewares/auth');


router.post('/', auth.checkSession, auth.checkAdmin, upload.single('img'), bannerController.registerBanner);
router.post('/sort', upload.single('img'), bannerController.sortBanner);
router.get('/select/:id', bannerController.findBannerById);
router.get('/', bannerController.findAllBanner);
router.get('/available', bannerController.availableBanner);
router.get('/search/:startDate', bannerController.searchBannerByStartDate);
router.put('/', auth.checkSession, auth.checkAdmin, upload.single('img'), bannerController.updateBannerById);


module.exports = router;
