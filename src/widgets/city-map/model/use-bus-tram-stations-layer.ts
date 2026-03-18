import { IconLayer } from 'deck.gl';

import { type BusTramStationFeature, useBusTramStationsQuery } from '@/entities/bus-tram-station';
import { ItemTypeEnum } from '@/shared/model';

import type { MapObjectClickPayload } from '../model/types.ts';
import { userPointsStore } from './user-points-store.ts';
import { useCreateUserPoint } from '../model/use-create-user-point.ts';

export const useBusTramStationsLayer = (
  onClickCallback: (event: MapObjectClickPayload) => void
) => {
  const { busTramStationsPoints } = useBusTramStationsQuery();
  const { isCreateModeEnabled } = useCreateUserPoint();
  const customUserPoints = userPointsStore((state) => state.addedBusTramStations);

  const busTramStationsLayer = new IconLayer<BusTramStationFeature>({
    id: 'bus-train-stops-layer',
    data: [...busTramStationsPoints, ...customUserPoints],
    getIcon: (d) => ({
      url: d.properties.icon || '/public/pin-icon.png',
      width: 128,
      height: 128,
      anchorY: 128,
    }),
    getPosition: (d) => d.geometry.coordinates,
    pickable: true,
    onClick: (pickingInfo) => {
      if (isCreateModeEnabled) return;
      onClickCallback({
        itemType: ItemTypeEnum.BusTramStation,
        data: pickingInfo.object,
      });
    },
    sizeUnits: 'pixels',
    getSize: 25,
  });
  return {
    busTramStationsLayer,
  };
};
