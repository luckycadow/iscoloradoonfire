import axios from 'axios';
import { parseStringPromise } from 'xml2js';

export interface Fire {
  id: number;
  title: string;
  description: string;
  link: string;
  latitude: number;
  longitude: number;
}

const cleanTitle  = (title: string): string => title.replace(/\(wildfire\)/gi, '');

const isWildfire = (fire: Fire): boolean => {
  return fire.title.toLowerCase().includes('(wildfire)');
};

const isInColorado = (fire: Fire): boolean => {
  // Colorado is a square along these lat/long boundaries
  return (
    fire.latitude > 37 &&
    fire.latitude < 41 &&
    fire.longitude < -102.03 &&
    fire.longitude > -109.03
  );
};

const parseFire = (fire: any): Fire => ({
  id: parseInt(fire.guid[0]._.replace(/[\D]/g, '')),
  title: fire.title[0],
  description: fire.description
    ? fire.description[0]
    : 'No information available.',
  link: fire.link[0],
  latitude: parseFloat(fire['geo:lat'][0]),
  longitude: parseFloat(fire['geo:long'][0]),
  
});

export const loadFires = async (): Promise<Fire[]> => {
  const res = await axios.get('https://inciweb.nwcg.gov/feeds/rss/incidents/');
  const feed = await parseStringPromise(res.data, null);


  const fires = []
  for (const item of feed.rss.channel[0].item) {
    console.log(item)
    const fire = parseFire(item);
    if (isWildfire(fire)) {    
      fires.push({
        ...fire,
        title: cleanTitle(fire.title),
      })
    }
  }

  return fires;
};
