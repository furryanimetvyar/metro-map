import type {BusTramStationFeature} from "@/entities/bus-tram-station";
import type {DistrictFeature} from "@/entities/district";
import type {McdStationFeature} from "@/entities/mcd-station";
import type {MckStationFeature} from "@/entities/mck-station";
import type {MetroStationFeature} from "@/entities/metro-station";
import type {StreetsPedestrianFeature} from "@/entities/streets-pedestrian";
import {ItemType} from "@/shared/model/ItemTypeEnum.ts";
import type {TValue} from "@/shared/model";

export type MapObjectClickPayload =
    | { itemType: typeof ItemType.BusTramStation; data: BusTramStationFeature }
    | { itemType: typeof ItemType.District; data: DistrictFeature }
    | { itemType: typeof ItemType.McdStation; data: McdStationFeature }
    | { itemType: typeof ItemType.MckStation; data: MckStationFeature }
    | { itemType: typeof ItemType.MetroStation; data: MetroStationFeature }
    | { itemType: typeof ItemType.StreetPedestrian; data: StreetsPedestrianFeature }

export interface ModalData {
    title: string;
    params: TValue<string>[]
}