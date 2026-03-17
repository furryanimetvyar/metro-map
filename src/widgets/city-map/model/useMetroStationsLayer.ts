import {IconLayer} from "deck.gl";
import {
    type MetroStationFeature,
    useMetroStationsQuery
} from "@/entities/metro-station";
import type {MapObjectClickPayload} from "@/features/point-info-modal/model/types.ts";
import {ItemType} from "@/shared/model/ItemTypeEnum.ts";


export const useMetroStationsLayer = (
    onClickCallback: (event: MapObjectClickPayload) => void
) => {
    const {metroStationsPoints} = useMetroStationsQuery();

    const metroStationsLayer = new IconLayer<MetroStationFeature>({
        id: 'metro-stations-layer',
        data: metroStationsPoints,
        getIcon: (d) => ({
            url: d.properties.icon,
            width: 128,
            height: 128,
            anchorY: 128,
        }),
        getPosition: (d) => d.geometry.coordinates,
        sizeUnits: "pixels",
        getSize: 20,
        pickable: true,
        onClick: (pickingInfo) => {
            onClickCallback({
                itemType: ItemType.MetroStation,
                data: pickingInfo.object
            })
        },
    })
    return {
        metroStationsLayer
    }
}
