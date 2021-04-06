const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');

router.get('/', (req, res) => {
  const passport = req.decoded;
  console.log(passport);
  if(passport) {
    return res.send("GOOD!");
  } 
  return res.send("NO~~~");
});

router.get('/admin', auth.checkAdmin, (req, res) => {
  const passport = req.decoded;
  if(passport) {
    return res.send("GOOD ADMIN!");
  } 
  return res.send("NO ADMIN!");
});

module.exports = router;