import {loadData} from "@/shared/utils";
import type {MckStationFeatureCollection} from "@/entities/mck-station/model/types.ts";

const FETCH_URL = '/data/mckStation.geojson'

export const loadMckStations = async (): Promise<MckStationFeatureCollection> => {
    return loadData<MckStationFeatureCollection>(FETCH_URL)
}
