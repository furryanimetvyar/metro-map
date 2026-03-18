import { loadData } from '@/shared/api';
import type { StreetsPedestrianFeatureCollection } from '../model/types.ts';

const FETCH_URL = '/data/streetsPedestrian.geojson';

export async function loadStreetsPedestrians(): Promise<StreetsPedestrianFeatureCollection> {
  return loadData<StreetsPedestrianFeatureCollection>(FETCH_URL);
}
