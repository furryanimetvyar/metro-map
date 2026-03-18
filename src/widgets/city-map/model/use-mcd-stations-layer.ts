import { IconLayer } from 'deck.gl';

import type { MapObjectClickPayload } from '@/features/point-info-modal';
import { type McdStationFeature, useMcdStationsQuery } from '@/entities/mcd-station';
import { ItemTypeEnum } from '@/shared/model';

import { userPointsStore } from './user-points-store.ts';

export const useMcdStationsLayer = (onClickCallback: (event: MapObjectClickPayload) => void) => {
  const { mcdStationsPoints } = useMcdStationsQuery();
  const customUserPoints = userPointsStore((state) => state.addedMcdStations);

  const mcdStationsLayer = new IconLayer<McdStationFeature>({
    id: 'mcd-stations-layer',
    data: [...mcdStationsPoints, ...customUserPoints],
    getIcon: (d) => ({
      url: d.properties.icon || '/public/pin-icon.png',
      width: 128,
      height: 128,
      anchorY: 128,
    }),
    getPosition: (d) => d.geometry.coordinates,
    sizeUnits: 'pixels',
    getSize: 25,
    pickable: true,
    onClick: (pickingInfo) => {
      onClickCallback({
        itemType: ItemTypeEnum.McdStation,
        data: pickingInfo.object,
      });
    },
  });
  return {
    mcdStationsLayer,
  };
};
