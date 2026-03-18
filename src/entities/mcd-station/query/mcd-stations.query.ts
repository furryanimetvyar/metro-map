import {useMemo} from "react";
import {useQuery} from "@tanstack/react-query";
import {loadMcdStations} from "../api/load-mcd-stations.ts";
import type {McdStationFeature, McdStationFeatureCollection} from "../model/types.ts"

export function useMcdStationsQuery() {
    const { data, isLoading } = useQuery<McdStationFeatureCollection>({
        queryKey: ['mcdStations'],
        queryFn: loadMcdStations,
    })

    const mcdStationsPoints = useMemo<McdStationFeature[]>(() => data?.features ?? [], [data])

    return {mcdStationsPoints, isLoading}
}
