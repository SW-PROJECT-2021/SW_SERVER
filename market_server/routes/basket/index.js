const express = require('express');
const router = express.Router();
const basketController= require('../../controller/basketController');
const auth = require('../../middlewares/auth');

router.get('/', auth.checkSession, basketController.getMyBasket);
router.post('/', auth.checkSession, basketController.putInMyBasket);
router.put('/', auth.checkSession, basketController.updateMyBasket);
router.delete('/:ProductId', auth.checkSession, basketController.deleteMyBasket);

module.exports = router;