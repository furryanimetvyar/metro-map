import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { loadMckStations } from '../api/load-mck-stations.ts';
import type { MckStationFeature, MckStationFeatureCollection } from '../model/types.ts';

export function useMckStationsQuery() {
  const { data, isLoading } = useQuery<MckStationFeatureCollection>({
    queryKey: ['mckStations'],
    queryFn: loadMckStations,
  });

  const mckStationsPoints = useMemo<MckStationFeature[]>(() => data?.features ?? [], [data]);

  return { mckStationsPoints, isLoading };
}
