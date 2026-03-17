import {IconLayer} from "deck.gl";
import {
    type McdStationFeature,
    useMcdStationsQuery
} from "@/entities/mcd-station";
import type {MapObjectClickPayload} from "@/features/point-info-modal/model/types.ts";
import {ItemType} from "@/shared/model/ItemTypeEnum.ts";
import {userPointsStore} from "@/widgets/city-map/model/userPointsStore.ts";


export const useMcdStationsLayer = (
    onClickCallback: (event: MapObjectClickPayload) => void
) => {
    const {mcdStationsPoints} = useMcdStationsQuery();
    const customUserPoints = userPointsStore((state) => state.addedMcdStations)

    const mcdStationsLayer = new IconLayer<McdStationFeature>({
        id: 'mcd-stations-layer',
        data: [...mcdStationsPoints, ...customUserPoints],
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
                itemType: ItemType.McdStation,
                data: pickingInfo.object
            })
        },
    })
    return {
        mcdStationsLayer
    }
}
