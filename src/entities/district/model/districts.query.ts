import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { loadDistricts } from '../api/load-districts.ts';
import type { DistrictFeature, DistrictFeatureCollection } from './types.ts';

export function useDistrictsQuery() {
  const { data, isLoading } = useQuery<DistrictFeatureCollection>({
    queryKey: ['districts'],
    queryFn: loadDistricts,
  });

  const districtsFeatures = useMemo<DistrictFeature[]>(() => data?.features ?? [], [data]);

  return { districtsFeatures, isLoading };
}
