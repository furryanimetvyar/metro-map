import {GeoJsonLayer} from "@deck.gl/layers";
import {
    type DistrictFeature,
    useDistrictsQuery
} from "@/entities/district";
import type {MapObjectClickPayload} from "@/features/point-info-modal/model/types.ts";
import {ItemType} from "@/shared/model/ItemTypeEnum.ts";


export const useDistrictsLayer = (
    onClickCallback: (event: MapObjectClickPayload) => void
) => {
    const {districtsFeatures} = useDistrictsQuery();

    const districtsLayer = new GeoJsonLayer<DistrictFeature>({
        id: 'district-features',
        data: districtsFeatures,
        getLineColor: [255, 255, 255],
        getFillColor: [255, 140, 0, 100],
        getLineWidth: 20,
        lineWidthMinPixels: 1,
        pickable: true,
        onClick: (pickingInfo) => {
            onClickCallback({
                itemType: ItemType.District,
                data: pickingInfo.object
            })
        },
    })
    return {
        districtsLayer
    }
}
