import { userPointsStore } from './user-points-store.ts';
import { FORM_FIELDS_BY_TYPE } from '@/features/add-point';
import { ItemTypeEnum } from '@/shared/model';
import type { BusTramStationFeature } from '@/entities/bus-tram-station';
import type { McdStationFeature } from '@/entities/mcd-station';
import type { MetroStationFeature } from '@/entities/metro-station';
import type { MckStationFeature } from '@/entities/mck-station';
import type { FormValues, PointItemType } from '@/features/add-point';
import { useState } from 'react';

export const useCreateUserPoint = () => {
  const [isCreateModeEnabled, setIsCreateModeEnabled] = useState<boolean>(false);
  const addBusTramStation = userPointsStore((state) => state.addBusTramStation);
  const addMcdStation = userPointsStore((state) => state.addMcdStation);
  const addMckStation = userPointsStore((state) => state.addMckStation);
  const addMetroStation = userPointsStore((state) => state.addMetroStation);

  const createPoint = (data: FormValues, coordinates: [number, number]) => {
    const type = data.type as PointItemType;

    const properties: Record<string, unknown> = {};
    for (const field of FORM_FIELDS_BY_TYPE[type]) {
      properties[field.name] = data[field.name] ?? '';
    }

    if (type === ItemTypeEnum.BusTramStation) {
      addBusTramStation({
        type: 'Feature',
        properties: { ...properties, icon: '' } as BusTramStationFeature['properties'],
        geometry: { type: 'Point', coordinates },
      });
    } else if (type === ItemTypeEnum.McdStation) {
      addMcdStation({
        type: 'Feature',
        properties: { ...properties, icon: '' } as McdStationFeature['properties'],
        geometry: { type: 'Point', coordinates },
      });
    } else if (type === ItemTypeEnum.MetroStation) {
      addMetroStation({
        type: 'Feature',
        properties: { ...properties, icon: '' } as MetroStationFeature['properties'],
        geometry: { type: 'Point', coordinates },
      });
    } else if (type === ItemTypeEnum.MckStation) {
      addMckStation({
        type: 'Feature',
        properties: { ...properties, icon: '' } as MckStationFeature['properties'],
        geometry: { type: 'Point', coordinates },
      });
    }
  };

  return {
    isCreateModeEnabled,
    createPoint,
    setIsCreateModeEnabled,
  };
};
