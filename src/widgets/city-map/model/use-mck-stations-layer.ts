import { IconLayer } from 'deck.gl';
import { useMemo } from 'react';

import { type MckStationFeature, useMckStationsQuery } from '@/entities/mck-station';
import { ItemTypeEnum } from '@/shared/model';

import type { MapObjectClickPayload } from '../model/types.ts';
import { userPointsStore } from './user-points-store.ts';
import { useCreateUserPoint } from '../model/use-create-user-point.ts';

export const useMckStationsLayer = (onClickCallback: (event: MapObjectClickPayload) => void) => {
  const { mckStationsPoints } = useMckStationsQuery();
  const { isCreateModeEnabled } = useCreateUserPoint();
  const customUserPoints = userPointsStore((state) => state.addedMckStations);

  const mckStationsLayer = useMemo(
    () =>
      new IconLayer<MckStationFeature>({
        id: 'mck-stations-layer',
        data: [...mckStationsPoints, ...customUserPoints],
        getIcon: (feature) => ({
          url: feature.properties.icon || '/public/pin-icon.png',
          width: 128,
          height: 128,
          anchorY: 128,
        }),
        getPosition: (feature) => feature.geometry.coordinates,
        sizeUnits: 'pixels',
        getSize: 25,
        pickable: true,
        onClick: (pickingInfo) => {
          if (isCreateModeEnabled) return;
          onClickCallback({
            itemType: ItemTypeEnum.MckStation,
            data: pickingInfo.object,
          });
        },
      }),
    [mckStationsPoints, customUserPoints, onClickCallback, isCreateModeEnabled]
  );
  return {
    mckStationsLayer,
  };
};
