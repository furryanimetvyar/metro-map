type MetroStationProperties = {
    fid: number;
    id_uarms: number | null;
    name_station: string;
    name_line: string;
    no_line: string;
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
    transfer: string;
    date: string;
    icon: string;
    iconWidth: number;
    iconHeight: number;
    pass: number;

    bandwidth_input: number;
    bandwidth_input_north: number | null;
    bandwidth_input_south: number | null;
    bandwidth_input_west: number | null;
    bandwidth_input_east: number | null;
    bandwidth_input_first: number | null;
    bandwidth_input_second: number | null;
    bandwidth_input_ground: number | null;
    bandwidth_input_underground: number | null;
    bandwidth_output: number;
    bandwidth_output_north: number | null;
    bandwidth_output_south: number | null;
    bandwidth_output_west: number | null;
    bandwidth_output_east: number | null;
    bandwidth_output_first: number | null;
    bandwidth_output_second: number | null;
    bandwidth_output_ground: number | null;
    bandwidth_output_underground: number | null;

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
