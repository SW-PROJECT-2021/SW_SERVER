const express = require('express');
const router = express.Router();
const questionController = require('../../controller/questionController');
const auth = require('../../middlewares/auth');

router.post('/', auth.checkSession, questionController.registerQuestion); 
router.post('/answer', auth.checkSession, questionController.registerAnswer);
router.get('/all', auth.checkSession, auth.checkAdmin, questionController.getAllQuestion); 
router.get('/user/all/:id', auth.checkSession, questionController.getMyQuestion); 
router.get('/detail/:id', auth.checkSession, questionController.getQuestionDetail); 

module.exports = router;