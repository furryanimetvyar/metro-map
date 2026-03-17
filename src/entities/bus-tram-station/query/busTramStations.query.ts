import {useMemo} from "react";
import {useQuery} from "@tanstack/react-query";
import {loadBusTramStations} from "../api/loadBusTramStations.ts";
import type {BusTramStationFeature, BusTramStationFeatureCollection} from "../model/types.ts"

export function useBusTramStationsQuery() {
    const { data, isLoading } = useQuery<BusTramStationFeatureCollection>({
        queryKey: ['busTramStations'],
        queryFn: loadBusTramStations,
    })

    const busTramStationsPoints = useMemo<BusTramStationFeature[]>(() => data?.features?? [], [data])

    return {busTramStationsPoints, isLoading}
}
