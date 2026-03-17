type McdStationProperties = {
    name_station: string;
    name_line: string;
    no_line: string;
    status: string;
    area_full: string;
    administrative_district_full: string;
    transfer: string;
    icon: string;
    pass: number | null;
    CurLd: string;
    CurLdRel: string;
    DistOnFoot: string;
    TimeOnFoot: string;
};

type McdStationGeometry = {
    type: "Point";
    coordinates: [number, number];
};

export type McdStationFeature = {
    type: "Feature";
    properties: McdStationProperties;
    geometry: McdStationGeometry;
};

export type McdStationFeatureCollection = {
    type: "FeatureCollection";
    features: McdStationFeature[];
};
