import {IconLayer} from "deck.gl";

import type {MapObjectClickPayload} from "@/features/point-info-modal";
import {
    type BusTramStationFeature,
    useBusTramStationsQuery
} from "@/entities/bus-tram-station";
import {ItemType} from "@/shared/model";

import {userPointsStore} from "../model/userPointsStore.ts";


export const useBusTramStationsLayer = (
    onClickCallback: (event: MapObjectClickPayload) => void
) => {
    const {busTramStationsPoints} = useBusTramStationsQuery();
    const customUserPoints = userPointsStore((state) => state.addedBusTramStations)

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
            onClickCallback({
                itemType: ItemType.BusTramStation,
                data: pickingInfo.object
            })
        },
        sizeUnits: 'pixels',
        getSize: 25
    })
    return {
        busTramStationsLayer
    }
}
