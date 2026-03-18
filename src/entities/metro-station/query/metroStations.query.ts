import {useMemo} from "react";
import {useQuery} from "@tanstack/react-query";

import {loadMetroStations} from "../api/loadMetroStations.ts";
import type {MetroStationFeature, MetroStationFeatureCollection} from "../model/types.ts"

export function useMetroStationsQuery() {
    const { data, isLoading } = useQuery<MetroStationFeatureCollection>({
        queryKey: ['metroStations'],
        queryFn: loadMetroStations,
    })

    const metroStationsPoints = useMemo<MetroStationFeature[]>(() => data?.features ?? [], [data])

    return {metroStationsPoints, isLoading}
}
