import {userPointsStore} from "../model/userPointsStore.ts";
import {FORM_FIELDS_BY_TYPE} from "@/features/point-add-modal/model/form-fields.ts";
import {ItemType} from "@/shared/model";
import type {BusTramStationFeature} from "@/entities/bus-tram-station";
import type {McdStationFeature} from "@/entities/mcd-station";
import type {MetroStationFeature} from "@/entities/metro-station";
import type {MckStationFeature} from "@/entities/mck-station";
import type {FormValues, PointItemType} from "@/features/point-add-modal";


export const useCreateUserPoint = () => {
    const addBusTramStation = userPointsStore((state) => state.addBusTramStation);
    const addMcdStation = userPointsStore((state) => state.addMcdStation);
    const addMckStation = userPointsStore((state) => state.addMckStation);
    const addMetroStation = userPointsStore((state) => state.addMetroStation);


    const createPoint = (data: FormValues, coordinates: [number, number]) => {
        const type = data.type as PointItemType;

        const properties: Record<string, unknown> = {};
        for (const field of FORM_FIELDS_BY_TYPE[type]) {
            properties[field.name] = data[field.name] ?? "";
        }

        if (type === ItemType.BusTramStation) {
            addBusTramStation({
                type: "Feature",
                properties: {...properties, icon: ""} as BusTramStationFeature["properties"],
                geometry: {type: "Point", coordinates},
            });
        } else if (type === ItemType.McdStation) {
            addMcdStation({
                type: "Feature",
                properties: {...properties, icon: ""} as McdStationFeature["properties"],
                geometry: {type: "Point", coordinates},
            });
        } else if (type === ItemType.MetroStation) {
            addMetroStation({
                type: "Feature",
                properties: {...properties, icon: ""} as MetroStationFeature["properties"],
                geometry: {type: "Point", coordinates},
            });
        } else if (type === ItemType.MckStation) {
            addMckStation({
                type: "Feature",
                properties: {...properties, icon: ""} as MckStationFeature["properties"],
                geometry: {type: "Point", coordinates},
            });
        }
    }

    return {
        createPoint
    }
}