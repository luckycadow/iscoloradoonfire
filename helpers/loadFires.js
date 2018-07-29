const axios = require('axios');
const { promisify } = require('util');
const { parseString } = require('xml2js');
const parseXml = promisify(parseString);


function isWildfire(fire) {

	return fire.title.toLowerCase().includes('(wildfire)');
}

function isInColorado(fire) {

	return fire.lat > 37 && fire.lat < 41 && fire.long < -102.03 && fire.long > -109.03;
}

async function loadFires() {

	const res = await axios.get('https://inciweb.nwcg.gov/feeds/rss/incidents/');
	const feed = await parseXml(res.data, null);

	const fires = feed.rss.channel[0].item
		.map((fire) => ({
			title: fire.title[0],
			description: fire.description ? fire.description[0] : 'No information available.',
			link: fire.link[0],
			lat: parseFloat(fire['geo:lat'][0]),
			long: parseFloat(fire['geo:long'][0])
		}))
		.filter(isInColorado)
		.filter(isWildfire);

	return fires;
}

module.exports = loadFires;