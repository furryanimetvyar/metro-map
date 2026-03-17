import {loadData} from "@/shared/utils";
import type {BusTramStationFeatureCollection} from "@/entities/bus-tram-station/model/types.ts";

const FETCH_URL = '/data/busTramStation.geojson'

export const loadBusTramStations = async (): Promise<BusTramStationFeatureCollection> => {
    return loadData<BusTramStationFeatureCollection>(FETCH_URL)
}
