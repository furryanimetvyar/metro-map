type StreetsPedestrianProperties = {
    ST_NAME: string;
    ST_TYP_BEF: string;
    ROAD_CATEG: string;
    TYPE_LINK: string;
    RoadDirect: string;
    Width: number;
    MaxSpdDrct: number;
    AvgSpdDrct: number;
    FUNC_CLASS: number;
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
