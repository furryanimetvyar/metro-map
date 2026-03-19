import { IconLayer } from 'deck.gl';
import { useMemo } from 'react';

import type { MapObjectClickPayload } from '../model/types.ts';
import { type McdStationFeature, useMcdStationsQuery } from '@/entities/mcd-station';
import { ItemTypeEnum } from '@/shared/model';

import { userPointsStore } from './user-points-store.ts';
import { useCreateUserPoint } from '../model/use-create-user-point.ts';

export const useMcdStationsLayer = (onClickCallback: (event: MapObjectClickPayload) => void) => {
  const { mcdStationsPoints } = useMcdStationsQuery();
  const { isCreateModeEnabled } = useCreateUserPoint();
  const customUserPoints = userPointsStore((state) => state.addedMcdStations);

  const mcdStationsLayer = useMemo(
    () =>
      new IconLayer<McdStationFeature>({
        id: 'mcd-stations-layer',
        data: [...mcdStationsPoints, ...customUserPoints],
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
            itemType: ItemTypeEnum.McdStation,
            data: pickingInfo.object,
          });
        },
      }),
    [mcdStationsPoints, customUserPoints, onClickCallback, isCreateModeEnabled]
  );
  return {
    mcdStationsLayer,
  };
};
