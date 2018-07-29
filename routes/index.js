const express = require('express');
const router = express.Router();
const loadFires = require('../helpers/loadFires');


let fires = [];
loadFires().then((latestFires) => fires = latestFires);
setInterval(async () => fires = await loadFires(), 1000 * 60);

/* GET home page. */
router.get('/', function(req, res, next) {

  if (fires.length) {
    res.render('fires', { fires, title: 'Yes, Colorado is on fire' });
  } else {
    res.render('nofires', { title: 'No, Colorado is not on fire' });
  }
});

module.exports = router;
