import { GeoJsonLayer } from '@deck.gl/layers';

import type { MapObjectClickPayload } from '../model/types.ts';
import { type DistrictFeature, useDistrictsQuery } from '@/entities/district';
import { ItemTypeEnum } from '@/shared/model';

import { useCreateUserPoint } from '../model/use-create-user-point.ts';

export const useDistrictsLayer = (onClickCallback: (event: MapObjectClickPayload) => void) => {
  const { districtsFeatures } = useDistrictsQuery();
  const { isCreateModeEnabled } = useCreateUserPoint();

  const districtsLayer = new GeoJsonLayer<DistrictFeature>({
    id: 'district-features',
    data: districtsFeatures,
    getLineColor: [255, 255, 255],
    getFillColor: [255, 140, 0, 100],
    getLineWidth: 20,
    lineWidthMinPixels: 1,
    pickable: true,
    onClick: (pickingInfo) => {
      if (isCreateModeEnabled) return;
      onClickCallback({
        itemType: ItemTypeEnum.District,
        data: pickingInfo.object,
      });
    },
  });
  return {
    districtsLayer,
  };
};
