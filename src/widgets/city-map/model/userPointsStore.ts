import {create} from "zustand";
import {persist} from "zustand/middleware";

import type {BusTramStationFeature} from "@/entities/bus-tram-station";
import type {MetroStationFeature} from "@/entities/metro-station";
import type {McdStationFeature} from "@/entities/mcd-station";
import type {MckStationFeature} from "@/entities/mck-station";

type MapEditableStore = {
    addedBusTramStations: BusTramStationFeature[]
    addedMetroStations: MetroStationFeature[]
    addedMcdStations: McdStationFeature[]
    addedMckStations: MckStationFeature[]

    addBusTramStation: (feature: BusTramStationFeature) => void
    addMetroStation: (feature: MetroStationFeature) => void
    addMcdStation: (feature: McdStationFeature) => void
    addMckStation: (feature: MckStationFeature) => void
}

export const userPointsStore = create<MapEditableStore>()(persist(
    (set) => ({
        addedBusTramStations: [],
        addedMcdStations: [],
        addedMckStations: [],
        addedMetroStations: [],

        addBusTramStation: (newPoint: BusTramStationFeature) => set((state) => ({
            ...state,
            addedBusTramStations: [...state.addedBusTramStations, newPoint],
    })),
        addMcdStation: (newPoint: McdStationFeature) => set((state) => ({
            ...state,
            addedMcdStations: [...state.addedMcdStations, newPoint],
        })),
        addMckStation: (newPoint: MckStationFeature) => set((state) => ({
            ...state,
            addedMckStations: [...state.addedMckStations, newPoint],
        })),
        addMetroStation: (newPoint: MetroStationFeature) => set((state) => ({
            ...state,
            addedMetroStations: [...state.addedMetroStations, newPoint],
        }))
    }), {
        name: 'custom_user_points',

    }))