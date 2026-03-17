import {loadData} from "@/shared/utils";
import type {McdStationFeatureCollection} from "@/entities/mcd-station/model/types.ts";

const FETCH_URL = '/data/mcdStation.geojson'

export const loadMcdStations = async (): Promise<McdStationFeatureCollection> => {
    return loadData<McdStationFeatureCollection>(FETCH_URL)
}