import {loadData} from "@/shared/utils/data-fetcher.ts";
import type {StreetsPedestrianFeatureCollection} from "../model/types.ts";

const FETCH_URL = '/data/streetsPedestrian.geojson'

export async function loadStreetsPedestrians(): Promise<StreetsPedestrianFeatureCollection> {
    return loadData<StreetsPedestrianFeatureCollection>(FETCH_URL)
}