import {IconLayer} from "deck.gl";
import {
    type MckStationFeature,
    useMckStationsQuery
} from "@/entities/mck-station";
import type {MapObjectClickPayload} from "@/features/point-info-modal/model/types.ts";
import {ItemType} from "@/shared/model/ItemTypeEnum.ts";
import {userPointsStore} from "@/widgets/city-map/model/userPointsStore.ts";


export const useMckStationsLayer = (
    onClickCallback: (event: MapObjectClickPayload) => void
) => {
    const {mckStationsPoints} = useMckStationsQuery();
    const customUserPoints = userPointsStore((state) => state.addedMckStations)

    const mckStationsLayer = new IconLayer<MckStationFeature>({
        id: 'mck-stations-layer',
        data: [...mckStationsPoints, ...customUserPoints],
        getIcon: (d) => ({
            url: d.properties.icon || '/public/pin-icon.png',
            width: 128,
            height: 128,
            anchorY: 128,
        }),
        getPosition: (d) => d.geometry.coordinates,
        sizeUnits: "pixels",
        getSize: 25,
        pickable: true,
        onClick: (pickingInfo) => {
            onClickCallback({
                itemType: ItemType.MckStation,
                data: pickingInfo.object
            })
        },
    })
    return {
        mckStationsLayer
    }
}
