type BusTramStationProperties = {
    fid: number;
    name_mpv: string;
    rayon: string;
    ao: string;
    address_mpv: string;
    y: string;
    x: string;
    marshrut: string;
    in_date: number;
    off_date: number;
    icon: string;
    iconWidth: number;
    iconHeight: number;

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

type BusTramStationGeometry = {
    type: "Point";

    coordinates: [number, number];
};

export type BusTramStationFeature = {
    type: "Feature";
    properties: BusTramStationProperties;
    geometry: BusTramStationGeometry;
};

export type BusTramStationFeatureCollection = {
    type: "FeatureCollection";
    features: BusTramStationFeature[];
};