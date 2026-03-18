type MckStationProperties = {
  name_station: string;
  name_line: string;
  status: string;
  area_full: string;
  administrative_district_full: string;
  transfer: string;
  icon: string;
  pass: number;
  bandwidth_input: number;
  bandwidth_output: number;
  CurLd: string;
  CurLdRel: string;
  DistOnFoot: string;
  TimeOnFoot: string;
};

type MckStationGeometry = {
  type: 'Point';
  coordinates: [number, number];
};

export type MckStationFeature = {
  type: 'Feature';
  properties: MckStationProperties;
  geometry: MckStationGeometry;
};

export type MckStationFeatureCollection = {
  type: 'FeatureCollection';
  features: MckStationFeature[];
};
