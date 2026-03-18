import { useState } from 'react';
import type { PickingInfo } from 'deck.gl';
import { DeckGL } from '@deck.gl/react';
import { Map } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

import {AddPoint, type FormValues} from '@/features/add-point';
import {Button} from "@/shared/ui";

import { useCreateUserPoint } from '../model/use-create-user-point.ts';
import PointInfoModal from './PointInfoModal.tsx';
import { useStreetsPedestrianLayer } from '../model/use-streets-pedestrian-layer.ts';
import { useDistrictsLayer } from '../model/use-districts-layer.ts';
import { useBusTramStationsLayer } from '../model/use-bus-tram-stations-layer.ts';
import { useMckStationsLayer } from '../model/use-mck-stations-layer.ts';
import { useMcdStationsLayer } from '../model/use-mcd-stations-layer.ts';
import { useMetroStationsLayer } from '../model/use-metro-stations-layer.ts';
import { INITIAL_VIEW_STATE } from '../model/initial-view-state.ts';
import type { MapObjectClickPayload } from '../model/types.ts';

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

const MapWidget = () => {
  const { streetsPedestrianLayer } = useStreetsPedestrianLayer(onMapClick);
  const { districtsLayer } = useDistrictsLayer(onMapClick);
  const { busTramStationsLayer } = useBusTramStationsLayer(onMapClick);
  const { mckStationsLayer } = useMckStationsLayer(onMapClick);
  const { mcdStationsLayer } = useMcdStationsLayer(onMapClick);
  const { metroStationsLayer } = useMetroStationsLayer(onMapClick);
  const { createPoint } = useCreateUserPoint();
  const {isCreateModeEnabled, setIsCreateModeEnabled} = useCreateUserPoint()

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

  function onMapClick(event: MapObjectClickPayload): void {
    setViewItemData(event);
    setViewModalOpen(true);
  }

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const saveClickCoordinates = (coordinates?: number[]): void => {
    setNewPointCoordinates(coordinates ?? []);
  };

  const handleAddModalOpenChange = (open: boolean) => {
    setAddModalOpen(open);

    if (!open) {
      setNewPointCoordinates([]);
    }
  };

  const onAddButtonClick = (): void => {
    setIsCreateModeEnabled(!isCreateModeEnabled);
  }

  const onDeckglMapClick = (info: PickingInfo) => {
    if (!isCreateModeEnabled) {
      return
    }
    saveClickCoordinates(info.coordinate);
    openAddModal();
  };

  const onPointCreate = (pointData: FormValues, coordinates: [number, number]) => {
    setIsCreateModeEnabled(false);
    createPoint(pointData, coordinates)
  }

  const getCursor = ({isDragging}: {isDragging: boolean}): string => {
    if (isCreateModeEnabled) return 'crosshair';
    return isDragging ? 'grabbing' : 'grab';
  }

  return (
    <div className="flex flex-row w-[100vw] h-[100vh]">
      <div className="relative w-full h-full">
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          layers={layers}
          onClick={onDeckglMapClick}
          getCursor={getCursor}
        >
          <Map mapStyle={MAP_STYLE} />
        </DeckGL>
      </div>
      <div className="absolute top-2 right-2 z-10">
        <PointInfoModal
          open={isViewModalOpen}
          onOpenChange={setViewModalOpen}
          modalData={viewItemData}
        />
        <Button onClick={onAddButtonClick}>{isCreateModeEnabled ? 'Отмена' : 'Создать точку'}</Button>
        <AddPoint
          open={isAddModalOpen}
          onOpenChange={handleAddModalOpenChange}
          initialCoordinates={newPointCoordinates}
          onCreatePoint={onPointCreate}
        />
      </div>
    </div>
  );
};

export default MapWidget;
