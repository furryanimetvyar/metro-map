type StreetsPedestrianProperties = {
    fid: number;
    EdgeId: number;
    ST_NAME: string;
    ST_TYP_BEF: string;
    ST_NM_BASE: string;
    ST_NM_CITY: string;
    FUNC_CLASS: number;
    ROAD_CATEG: string;
    F_ZLEV: number;
    T_ZLEV: number;
    TYPE_LINK: string;
    RoadDirect: string;
    RbndStght: number | null;
    RbndBck: number | null;
    Width: number;
    IsFerry: string;
    Style: number;
    U_TURN: number;
    OriginId: string;
    MaxSpdDrct: number;
    AvgSpdDrct: number;
    MaxSpdRvrs: number;
    AvgSpdRvrs: number;
    Foot: number;
    Car: number;
};

type StreetsPedestrianGeometry = {
    type: "MultiLineString";
    coordinates: [number, number][][];
};

export type StreetsPedestrianFeature = {
    type: "Feature";
    properties: StreetsPedestrianProperties;
    geometry: StreetsPedestrianGeometry;
};

export type StreetsPedestrianFeatureCollection = {
    type: "FeatureCollection";
    name: string;
    crs: {
        type: string;
        properties: { name: string };
    };
    features: StreetsPedestrianFeature[];
};