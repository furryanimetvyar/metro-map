import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { loadStreetsPedestrians } from '../api/load-streets-pedestrians.ts';
import type {
  StreetsPedestrianFeature,
  StreetsPedestrianFeatureCollection,
} from './types.ts';

export function useStreetsPedestriansQuery() {
  const { data, isLoading } = useQuery<StreetsPedestrianFeatureCollection>({
    queryKey: ['streetsPedestrians'],
    queryFn: loadStreetsPedestrians,
  });

  const streetsData = useMemo<StreetsPedestrianFeature[]>(() => data?.features ?? [], [data]);

  return { streetsPedestrians: streetsData, isLoading };
}
