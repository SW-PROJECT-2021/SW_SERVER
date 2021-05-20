const express = require('express');
const router = express.Router();
const upload = require('../../modules/multer');
const productController = require('../../controller/productController');
const auth = require('../../middlewares/auth');

router.post('/', auth.checkSession, auth.checkAdmin, upload.array('imgs', 3), productController.registerProduct);
router.get('/select/:id', productController.findProductById);
router.get('/', productController.findAllProduct);
router.get('/recent', productController.findRecentProduct);
router.get('/one/:category', productController.findAllProductByOneCategory);
router.get('/aerobic', productController.findAllProductByAerobic);
router.get('/weight', productController.findAllProductByWeight);
router.get('/aids', productController.findAllProductByAids);
router.get('/massage', productController.findAllProductByMassage);
router.get('/assistant', productController.findAllProductByAssistant);
// router.get('/search', productController.findAllProductBySearch);
router.get('/search/detail', productController.findAllProductBySearchDetail);
router.put('/', auth.checkSession, auth.checkAdmin, upload.array('imgs', 3), productController.updateProductById);
router.delete('/:id', auth.checkSession, auth.checkAdmin, productController.deleteProductById);
// router.post('/array', upload.array('imgs', 3), productController.uploadImgs);

module.exports = router;