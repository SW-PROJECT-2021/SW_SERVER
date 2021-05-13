const express = require('express');
const router = express.Router();
const destController= require('../../controller/destController');
const auth = require('../../middlewares/auth');

// router.get('/', auth.checkSession);
router.post('/', auth.checkSession, destController.registerDestination);
router.put('/', auth.checkSession);
// router.delete('/:id', auth.checkSession);

module.exports = router;