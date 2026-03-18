import {loadData} from "@/shared/utils";
import type {MetroStationFeatureCollection} from "../model/types.ts";

const FETCH_URL = '/data/metroStation.geojson'

export const loadMetroStations = async (): Promise<MetroStationFeatureCollection> => {
    return loadData<MetroStationFeatureCollection>(FETCH_URL)
}
