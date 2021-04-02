const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');

router.get('/', (req, res) => {
  const userId = req.decoded;
  console.log(userId);
  if(userId) {
    return res.send("GOOD!");
  } 
  return res.send("NO~~~");
});

router.get('/admin', auth.checkAdmin, (req, res) => {
  const userId = req.decoded;
  if(userId) {
    return res.send("GOOD ADMIN!");
  } 
  return res.send("NO ADMIN!");
});

module.exports = router;