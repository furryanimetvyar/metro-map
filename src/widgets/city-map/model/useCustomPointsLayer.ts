import { ScatterplotLayer } from "deck.gl";
import type { MapObjectClickPayload } from "@/features/point-info-modal/model/types.ts";
import { ItemType } from "@/shared/model/ItemTypeEnum.ts";
import { useCustomPointsStore } from "@/widgets/city-map/model/custom-points.store.ts";
import type { CustomPointFeature } from "@/entities/custom-points";

export const useCustomPointsLayer = (
    onClickCallback: (event: MapObjectClickPayload) => void
) => {
    const customPoints = useCustomPointsStore((state) => state.customPoints);
    console.log('___________', customPoints);
    const customPointsLayer = new ScatterplotLayer<CustomPointFeature>({
        id: "custom-points-layer",
        data: customPoints.features,
        pickable: true,
        getPosition: (d) => d.geometry.coordinates,
        getRadius: 8,
        radiusUnits: "pixels",
        radiusMinPixels: 6,
        radiusMaxPixels: 10,
        getFillColor: [255, 99, 71, 220],
        getLineColor: [255, 255, 255, 255],
        getLineWidth: 1,
        stroked: true,
        onClick: (pickingInfo) => {
            if (pickingInfo.object) {
                onClickCallback({
                    itemType: ItemType.CustomPoint,
                    data: pickingInfo.object,
                });
            }
        },
    });

    return {
        customPointsLayer,
    };
};