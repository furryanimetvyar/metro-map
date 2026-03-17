import {loadData} from "@/shared/utils";
import type {DistrictFeatureCollection} from "@/entities/district/model/types.ts";

const FETCH_URL = '/data/districtsLayer.geojson'

export const loadDistricts = async (): Promise<DistrictFeatureCollection> => {
    return loadData<DistrictFeatureCollection>(FETCH_URL)
}