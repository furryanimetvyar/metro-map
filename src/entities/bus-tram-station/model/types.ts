type BusTramStationProperties = {
  name_mpv: string;
  rayon: string;
  ao: string;
  address_mpv: string;
  marshrut: string;
  icon: string;
  CurLd: string;
  CurLdRel: string;
  DistOnFoot: string;
  TimeOnFoot: string;
};

type BusTramStationGeometry = {
  type: 'Point';

  coordinates: [number, number];
};

export type BusTramStationFeature = {
  type: 'Feature';
  properties: BusTramStationProperties;
  geometry: BusTramStationGeometry;
};

export type BusTramStationFeatureCollection = {
  type: 'FeatureCollection';
  features: BusTramStationFeature[];
};
