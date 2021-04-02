var express = require('express');
var router = express.Router();

const member = [{
    "number": "17101223",
    "name": "오승재",
    "part": "BACK"
  },
  {
    "number": "17101212",
    "name": "박지수",
    "part": "BACK"
  },
  {
    "number": "17101245",
    "name": "조인혁",
    "part": "FRONT"
  },
  {
    "number": "17101220",
    "name": "신성일",
    "part": "FRONT"
  }
];

router.use('/user', require('./user'));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: '6 TEAM',
    member
  });
});

module.exports = router;