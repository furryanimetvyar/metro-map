import {useEffect, useState} from "react";
import {DeckGL} from '@deck.gl/react';
import {Map} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

import PointAddModal from "@/features/point-add-modal";
import PointInfoModal from "@/features/point-info-modal";
import type {MapObjectClickPayload} from "@/features/point-info-modal/model/types.ts";

import {useStreetsPedestrianLayer} from "../model/useStreetsPedestrianLayer.ts";
import {useDistrictsLayer} from "../model/useDistrictsLayer.ts";
import {useBusTramStationsLayer} from "../model/useBusTramStationsLayer.ts";
import {useMckStationsLayer} from "../model/useMckStationsLayer.ts";
import {useMcdStationsLayer} from "../model/useMcdStationsLayer.ts";
import {useMetroStationsLayer} from "../model/useMetroStationsLayer.ts";
import {INITIAL_VIEW_STATE} from "../model/initial-coords.ts";
import styles from './MapWidget.module.scss'
import {useCreateUserPoint} from "@/widgets/city-map/model/useCreateUserPoint.ts";

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

const MapWidget = () => {
    const {streetsPedestrianLayer} = useStreetsPedestrianLayer(onMapClick);
    const {districtsLayer} = useDistrictsLayer(onMapClick);
    const {busTramStationsLayer} = useBusTramStationsLayer(onMapClick);
    const {mckStationsLayer} = useMckStationsLayer(onMapClick);
    const {mcdStationsLayer} = useMcdStationsLayer(onMapClick);
    const {metroStationsLayer} = useMetroStationsLayer(onMapClick);
    const { createPoint } = useCreateUserPoint()


    const layers = [
        districtsLayer,
        streetsPedestrianLayer,
        busTramStationsLayer,
        mckStationsLayer,
        mcdStationsLayer,
        metroStationsLayer,
    ];

    const [viewItemData, setViewItemData] = useState<MapObjectClickPayload | null>(null);
    const [newPointCoordinates, setNewPointCoordinates] = useState<number[]>([]);
    const [isViewModalOpen, setViewModalOpen] = useState<boolean>(false);
    const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);

    function onMapClick (event: MapObjectClickPayload): void {
        setViewItemData(event)
        setViewModalOpen(true);
    }

    const openAddModal = () => {
        setAddModalOpen(true);
    }

    const saveClickCoordinates = (coordinates?: number[]): void => {
        setNewPointCoordinates(coordinates ?? [])
    }

    useEffect(() => {
        !isAddModalOpen && setNewPointCoordinates([])
    }, [isAddModalOpen]);

    return (
        <div className={styles['map-widget']}>
            <div className={styles['map-widget__map']}>
                <DeckGL
                        initialViewState={INITIAL_VIEW_STATE}
                        controller={true}
                        layers={layers}
                        onClick={(info) => {
                            saveClickCoordinates(info.coordinate)
                            if (!info.object) {
                                openAddModal()
                            }
                        }}
                    >
                    <Map mapStyle={MAP_STYLE} />
                </DeckGL>
            </div>
            <div className={styles['map-widget__controls']}>
                <PointInfoModal open={isViewModalOpen} onOpenChange={setViewModalOpen} modalData={viewItemData} onNewPointAdd={() => {
                    setViewModalOpen(false);
                    openAddModal()
                }} />
                <PointAddModal open={isAddModalOpen} onOpenChange={setAddModalOpen} initialCoordinates={newPointCoordinates} onCreatePoint={createPoint}/>
            </div>
        </div>
    );
};

export default MapWidget;
