import {useQuery} from "@tanstack/react-query";
import {loadStreetsPedestrians} from "../api/loadStreetsPedestrians.ts";
import type {StreetsPedestrianFeature, StreetsPedestrianFeatureCollection} from "../model/types.ts";
import {useMemo} from "react";


export function useStreetsPedestriansQuery() {
    const { data, isLoading } = useQuery<StreetsPedestrianFeatureCollection>({
        queryKey: ['streetsPedestrians'],
        queryFn: loadStreetsPedestrians,
    })

    const streetsData = useMemo<StreetsPedestrianFeature[]>(() => data?.features ?? [], [data])

    return {streetsPedestrians: streetsData, isLoading}
}
