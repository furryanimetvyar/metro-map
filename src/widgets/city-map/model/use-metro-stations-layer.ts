import { IconLayer } from 'deck.gl';
import { useMemo } from 'react';

import { type MetroStationFeature, useMetroStationsQuery } from '@/entities/metro-station';
import { ItemTypeEnum } from '@/shared/model';

import type { MapObjectClickPayload } from '../model/types.ts';
import { userPointsStore } from './user-points-store.ts';
import { useCreateUserPoint } from '../model/use-create-user-point.ts';

export const useMetroStationsLayer = (onClickCallback: (event: MapObjectClickPayload) => void) => {
  const { metroStationsPoints } = useMetroStationsQuery();
  const { isCreateModeEnabled } = useCreateUserPoint();
  const customUserPoints = userPointsStore((state) => state.addedMetroStations);

  const metroStationsLayer = useMemo(
    () =>
      new IconLayer<MetroStationFeature>({
        id: 'metro-stations-layer',
        data: [...metroStationsPoints, ...customUserPoints],
        getIcon: (feature) => ({
          url: feature.properties.icon || '/public/pin-icon.png',
          width: 128,
          height: 128,
          anchorY: 128,
        }),
        getPosition: (feature) => feature.geometry.coordinates,
        sizeUnits: 'pixels',
        getSize: 20,
        pickable: true,
        onClick: (pickingInfo) => {
          if (isCreateModeEnabled) return;
          onClickCallback({
            itemType: ItemTypeEnum.MetroStation,
            data: pickingInfo.object,
          });
        },
      }),
    [metroStationsPoints, customUserPoints, onClickCallback, isCreateModeEnabled]
  );
  return {
    metroStationsLayer,
  };
};
