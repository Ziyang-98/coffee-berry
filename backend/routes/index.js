var express = require('express');
var router = express.Router();

// define the Express app
const app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hi coffee here');
});

module.exports = router;
