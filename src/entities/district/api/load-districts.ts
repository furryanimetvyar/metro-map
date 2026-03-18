import type { DistrictFeatureCollection } from '../model/types.ts';
import { loadData } from '@/shared/api';

const FETCH_URL = '/data/districtsLayer.geojson';

export const loadDistricts = async (): Promise<DistrictFeatureCollection> => {
  return loadData<DistrictFeatureCollection>(FETCH_URL);
};
