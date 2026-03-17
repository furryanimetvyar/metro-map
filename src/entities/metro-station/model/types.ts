type MetroStationProperties = {
    name_station: string;
    name_line: string;
    no_line: string;
    status: string;
    date: string;
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

type MetroStationGeometry = {
    type: "Point";
    coordinates: [number, number];
};

export type MetroStationFeature = {
    type: "Feature";
    properties: MetroStationProperties;
    geometry: MetroStationGeometry;
};

export type MetroStationFeatureCollection = {
    type: "FeatureCollection";
    features: MetroStationFeature[];
};
