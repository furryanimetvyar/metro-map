import {loadData} from "@/shared/lib";

import type {BusTramStationFeatureCollection} from "../model/types.ts";

const FETCH_URL = '/data/busTramStation.geojson'

export const loadBusTramStations = async (): Promise<BusTramStationFeatureCollection> => {
    return loadData<BusTramStationFeatureCollection>(FETCH_URL)
}
