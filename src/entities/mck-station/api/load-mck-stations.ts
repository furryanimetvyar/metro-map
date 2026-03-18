import { loadData } from '@/shared/lib';
import type { MckStationFeatureCollection } from '../model/types.ts';

const FETCH_URL = '/data/mckStation.geojson';

export const loadMckStations = async (): Promise<MckStationFeatureCollection> => {
  return loadData<MckStationFeatureCollection>(FETCH_URL);
};
