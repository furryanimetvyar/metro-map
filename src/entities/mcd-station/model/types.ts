type McdStationProperties = {
    fid: number;
    id_uarms: number | null;
    name_station: string;
    name_line: string;
    type: string;
    status: string;
    longitude: number;
    latitude: number;
    level: string;
    area: string;
    administrative_district: string;
    area_full: string;
    administrative_district_full: string;
    code: number;
    no_line: string;
    transfer: string;
    name_station_name_line: string;
    id_line: number;
    id_station: number;
    icon: string;
    iconWidth: number;
    iconHeight: number;
    pass: number | null;

    ExtrLdD1: number;
    ExtrLdA1: number;
    ExtrLdD2: string;
    ExtrLdA2: string;
    ExtrLdD3: string;
    ExtrLdA3: string;
    CurLd: string;
    CurLdRel: string;
    ExtrLdTot: number;
    NewLdRel: string;
    NewLd: string;
    ExtrLdRel: string;

    CurLdSt: string;
    CurLdRelSt: string;
    ExtrLdSt: string;
    ExtrLdRelSt: string;
    NewLdSt: string;
    NewLdRelSt: string;

    DistOnFoot: string;
    TimeOnFoot: string;
    AvgCurLdRp: string;
    AvgCurLdBT: string;
    AvgNewLdRp: string;
    AvgNewLdBT: string;

    PaintPoint: boolean;
    AvlbOnFoot: boolean;
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