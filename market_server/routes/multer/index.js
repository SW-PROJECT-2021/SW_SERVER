const express = require('express');
const router = express.Router();
const upload = require('../../modules/multer');

router.post('/single', upload.single('img'), async (req, res) => {
  const passport  = req.decoded;
  const curUser = passport.user;
  console.log(curUser);
  const img = req.file.location;
  res.send({
    img
  });
});


module.exports = router;