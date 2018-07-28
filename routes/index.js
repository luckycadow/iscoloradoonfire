const express = require('express');
const router = express.Router();
const axios = require('axios');
const xml2js = require('xml2js');

const fires = [];

async function loadFires() {

  const res = await axios.get('https://inciweb.nwcg.gov/feeds/rss/incidents/');
  xml2js.parseString(res.data, (err, feed) => {


    const latestFires = feed.rss.channel[0].item.filter((fire) => {

      const lat = parseFloat(fire['geo:lat'][0]);
      const long = parseFloat(fire['geo:long'][0]);
      return lat > 37 && lat < 41 && long < -102.03 && long > -109.03;
    }).map((fire) => ({
      title: fire.title[0],
      description: fire.description[0],
      link: fire.link[0],
      lat: parseFloat(fire['geo:lat'][0]),
      long: parseFloat(fire['geo:long'][0])
    }));

    fires.splice(0, fires.length, ...latestFires);
  });
}

setInterval(loadFires, 1000 * 60);
loadFires();

/* GET home page. */
router.get('/', function(req, res, next) {

  console.log(fires);
  const title = fires.length ? 'Yes, Colorado is on fire' : 'No, Colorado is not on fire';
  res.render('index', { title, fires });
});

module.exports = router;
