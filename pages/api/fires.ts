import { NextApiResponse, NextApiRequest } from 'next';
import { loadFires } from '../../utils/fires';


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const fires = await loadFires();
  res.statusCode = 200;
  res.setHeader('cache-control', 's-maxage=3600');
  res.json(fires);
};
