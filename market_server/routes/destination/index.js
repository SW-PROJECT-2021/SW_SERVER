const express = require('express');
const router = express.Router();
const destController = require('../../controller/destController');
const auth = require('../../middlewares/auth');

router.get('/', auth.checkSession, destController.getDestination);
router.get('/:id', auth.checkSession, destController.getByDestination);
router.post('/', auth.checkSession, destController.registerDestination);
router.put('/', auth.checkSession, destController.updateDestination);
router.delete('/:id', auth.checkSession, destController.deleteDestination);

module.exports = router;