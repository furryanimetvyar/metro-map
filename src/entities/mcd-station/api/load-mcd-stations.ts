import { loadData } from '@/shared/api';

import type { McdStationFeatureCollection } from '../model/types.ts';

const FETCH_URL = '/data/mcdStation.geojson';

export const loadMcdStations = async (): Promise<McdStationFeatureCollection> => {
  return loadData<McdStationFeatureCollection>(FETCH_URL);
};
