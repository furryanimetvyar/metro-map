import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
    CustomPointFeature,
    CustomPointFeatureCollection,
} from '@/entities/custom-points'

type CustomPointsStore = {
    customPoints: CustomPointFeatureCollection
    addPoint: (newPoint: CustomPointFeature) => void
}

const EMPTY_FEATURE_COLLECTION: CustomPointFeatureCollection = {
    type: 'FeatureCollection',
    features: [],
}

export const useCustomPointsStore = create<CustomPointsStore>()(
    persist(
        (set) => ({
            customPoints: EMPTY_FEATURE_COLLECTION,

            addPoint: (newPoint) =>
                set((state) => ({
                    customPoints: {
                        ...state.customPoints,
                        features: [...state.customPoints.features, newPoint],
                    },
                })),
        }),
        {
            name: 'custom_user_points',
        }
    )
)