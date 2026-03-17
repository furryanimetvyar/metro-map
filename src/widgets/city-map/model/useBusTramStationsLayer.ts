import {IconLayer} from "deck.gl";
import {
    type BusTramStationFeature,
    useBusTramStationsQuery
} from "@/entities/bus-tram-station";
import type {MapObjectClickPayload} from "@/features/point-info-modal/model/types.ts";
import {ItemType} from "@/shared/model/ItemTypeEnum.ts";
import {userPointsStore} from "@/widgets/city-map/model/userPointsStore.ts";



export const useBusTramStationsLayer = (
    onClickCallback: (event: MapObjectClickPayload) => void
) => {
    const {busTramStationsPoints} = useBusTramStationsQuery();
    const customUserPoints = userPointsStore((state) => state.addedBusTramStations)

    const busTramStationsLayer = new IconLayer<BusTramStationFeature>({
        id: 'bus-train-stops-layer',
        data: [...busTramStationsPoints, ...customUserPoints],
        getIcon: (d) => ({
            url: d.properties.icon,
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
