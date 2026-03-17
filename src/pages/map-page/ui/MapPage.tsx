import {DeckGL} from '@deck.gl/react';
import {Map} from 'react-map-gl/maplibre';
import type {MapViewState} from '@deck.gl/core';
import {GeoJsonLayer} from '@deck.gl/layers';
import 'maplibre-gl/dist/maplibre-gl.css';

import {useStreetsPedestriansQuery} from '@/entities/streets-pedestrian';
import {type BusTramStationFeature, useBusTramStationsQuery} from "@/entities/bus-tram-station";
import {IconLayer, ScatterplotLayer} from "deck.gl";
import {useDistrictsQuery} from "@/entities/district";
import type { DistrictFeature } from "@/entities/district"
import {type MckStationFeature, useMckStationsQuery} from "@/entities/mck-station";
import {type McdStationFeature, useMcdStationsQuery} from "@/entities/mcd-station";
import {type MetroStationFeature, useMetroStationsQuery} from "@/entities/metro-station";


const INITIAL_VIEW_STATE: MapViewState = {
    longitude: 37.715399,
    latitude: 55.809115,
    zoom: 14
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

const MapPage = () => {
    const {streetsPedestrians: streetsData, isLoading} = useStreetsPedestriansQuery();
    const {busTramStationsPoints} = useBusTramStationsQuery()
    const {districtsFeatures} = useDistrictsQuery()
    const {mckStationsPoints} = useMckStationsQuery()
    const {mcdStationsPoints} = useMcdStationsQuery()
    const {metroStationsPoints} = useMetroStationsQuery()

    const layers = [
        new GeoJsonLayer({
            id: 'streets-layer',
            stroked: true,
            data: {...streetsData},
            filled: false,
            pickable: true,
            getLineColor: [0, 120, 255, 220],
            getLineWidth: 2,
            lineWidthMinPixels: 1
        }),
        new GeoJsonLayer<DistrictFeature>({
            id: 'district-features',
            data: {
                type: 'FeatureCollection',
                features: districtsFeatures,
            },
            getLineColor: [255, 255, 255],
            getFillColor: [255, 140, 0, 100],
            getLineWidth: 20,
            lineWidthMinPixels: 1,
            pickable: true
        }),
        new IconLayer<BusTramStationFeature>({
            id: 'bus-train-stops-layer',
            data: busTramStationsPoints,
            getIcon: (d) => ({
                url: d.properties.icon,
                width: 128,
                height: 128,
                anchorY: 128,
            }),
            getPosition: (d) => d.geometry.coordinates,
            pickable: true,
            sizeUnits: 'pixels',
            getSize: 25
        }),
        new IconLayer<MckStationFeature>({
            id: 'mck-stations-layer',
            data: mckStationsPoints,
            getIcon: (d) => ({
                url: d.properties.icon,
                width: 128,
                height: 128,
                anchorY: 128,
            }),
            getPosition: (d) => d.geometry.coordinates,
            sizeUnits: "pixels",
            getSize: 25,
            pickable: true,
        }),
        new IconLayer<McdStationFeature>({
            id: 'mck-stations-layer',
            data: mcdStationsPoints,
            getIcon: (d) => ({
                url: d.properties.icon,
                width: 128,
                height: 128,
                anchorY: 128,
            }),
            getPosition: (d) => d.geometry.coordinates,
            sizeUnits: "pixels",
            getSize: 25,
            pickable: true,
        }),
        new IconLayer<MetroStationFeature>({
            id: 'mck-stations-layer',
            data: metroStationsPoints,
            getIcon: (d) => ({
                url: d.properties.icon,
                width: 128,
                height: 128,
                anchorY: 128,
            }),
            getPosition: (d) => d.geometry.coordinates,
            sizeUnits: "pixels",
            getSize: 20,
            pickable: true,
        })
    ];

    if (isLoading) return <div>Загрузка...</div>;

    return (
        <div>
            <DeckGL
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                layers={layers}
            >
                <Map mapStyle={MAP_STYLE} />
            </DeckGL>
        </div>
    );
};

export default MapPage;