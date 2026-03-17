import {useQuery} from "@tanstack/react-query";
import {loadStreetsPedestrians} from "../api/loadStreetsPedestrians.ts";
import type {StreetsPedestrianFeatureCollection} from "../model/types.ts";


export function useStreetsPedestriansQuery() {
    const { data, isLoading } = useQuery<StreetsPedestrianFeatureCollection>({
        queryKey: ['streetsPedestrians'],
        queryFn: loadStreetsPedestrians,
    })

    return {streetsPedestrians: data, isLoading}
}
