import {GeoJsonLayer} from "@deck.gl/layers";

import type {MapObjectClickPayload} from "@/features/point-info-modal";
import {
    type StreetsPedestrianFeatureCollection,
    useStreetsPedestriansQuery
} from "@/entities/streets-pedestrian";
import {ItemTypeEnum} from "@/shared/model";


export const useStreetsPedestrianLayer = (
    onClickCallback: (event: MapObjectClickPayload) => void
) => {
    const {streetsPedestrians} = useStreetsPedestriansQuery();

    const streetsPedestrianLayer = new GeoJsonLayer<StreetsPedestrianFeatureCollection>({
        id: 'streets-layer',
        stroked: true,
        data: streetsPedestrians,
        filled: false,
        pickable: true,
        getLineColor: [0, 120, 255, 220],
        getLineWidth: 2,
        lineWidthMinPixels: 1,
        onClick: (pickingInfo) => {
            onClickCallback({
                itemType: ItemTypeEnum.StreetPedestrian,
                data: pickingInfo.object
            })
        },
    })
    return {
        streetsPedestrianLayer
    }
}
