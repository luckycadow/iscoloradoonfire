// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { NextApiResponse, NextApiRequest } from 'next';

export interface Fire {
  id: number;
  title: string;
  description: string;
  link: string;
  latitude: number;
  longitude: number;
}

const isWildfire = (fire: Fire): boolean => {
  return fire.title.toLowerCase().includes('(wildfire)');
};

const isInColorado = (fire: Fire): boolean => {
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

  const fires = feed.rss.channel[0].item
    .map(parseFire)
    .filter(isInColorado)
    .filter(isWildfire);

  return fires;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const fires = await loadFires();
  res.statusCode = 200;
  res.setHeader('cache-control', 's-maxage=3600');
  res.json(fires);
};
