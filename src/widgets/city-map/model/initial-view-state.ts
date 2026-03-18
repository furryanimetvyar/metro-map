import type { MapViewState } from '@deck.gl/core';

const INITIAL_LONGITUDE = 37.715399;
const INITIAL_LATITUDE = 55.809115;
const INITIAL_ZOOM = 12;

export const INITIAL_VIEW_STATE: MapViewState = {
  longitude: INITIAL_LONGITUDE,
  latitude: INITIAL_LATITUDE,
  zoom: INITIAL_ZOOM,
};
