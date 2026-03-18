import { GeoJsonLayer } from '@deck.gl/layers';
import { useMemo } from 'react';

import {
  type StreetsPedestrianFeatureCollection,
  useStreetsPedestriansQuery,
} from '@/entities/streets-pedestrian';
import { ItemTypeEnum } from '@/shared/model';

import type { MapObjectClickPayload } from '../model/types.ts';
import { useCreateUserPoint } from '../model/use-create-user-point.ts';

export const useStreetsPedestrianLayer = (
  onClickCallback: (event: MapObjectClickPayload) => void
) => {
  const { streetsPedestrians } = useStreetsPedestriansQuery();
  const { isCreateModeEnabled } = useCreateUserPoint();

  const streetsPedestrianLayer = useMemo(
    () =>
      new GeoJsonLayer<StreetsPedestrianFeatureCollection>({
        id: 'streets-layer',
        stroked: true,
        data: streetsPedestrians,
        filled: false,
        pickable: true,
        getLineColor: [0, 120, 255, 220],
        getLineWidth: 2,
        lineWidthMinPixels: 1,
        onClick: (pickingInfo) => {
          if (isCreateModeEnabled) return;
          onClickCallback({
            itemType: ItemTypeEnum.StreetPedestrian,
            data: pickingInfo.object,
          });
        },
      }),
    [streetsPedestrians, onClickCallback, isCreateModeEnabled],
  );
  return {
    streetsPedestrianLayer,
  };
};
