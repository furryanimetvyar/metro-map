import type { BusTramStationFeature } from '@/entities/bus-tram-station';
import type { DistrictFeature } from '@/entities/district';
import type { McdStationFeature } from '@/entities/mcd-station';
import type { MckStationFeature } from '@/entities/mck-station';
import type { MetroStationFeature } from '@/entities/metro-station';
import type { StreetsPedestrianFeature } from '@/entities/streets-pedestrian';
import { ItemTypeEnum } from '@/shared/model';
import type { TValue } from '@/shared/model';

export type MapObjectClickPayload =
  | { itemType: typeof ItemTypeEnum.BusTramStation; data: BusTramStationFeature }
  | { itemType: typeof ItemTypeEnum.District; data: DistrictFeature }
  | { itemType: typeof ItemTypeEnum.McdStation; data: McdStationFeature }
  | { itemType: typeof ItemTypeEnum.MckStation; data: MckStationFeature }
  | { itemType: typeof ItemTypeEnum.MetroStation; data: MetroStationFeature }
  | { itemType: typeof ItemTypeEnum.StreetPedestrian; data: StreetsPedestrianFeature };

export interface ModalData {
  title: string;
  params: TValue<string>[];
}
