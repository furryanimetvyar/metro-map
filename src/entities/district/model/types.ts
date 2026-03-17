type DistrictProperties = {
    NAME: string;
    NAME_AO: string;
};

type DistrictGeometry = {
    type: "MultiPolygon";
    coordinates: [number, number][][][];
};

export type DistrictFeature = {
    type: "Feature";
    properties: DistrictProperties;
    geometry: DistrictGeometry;
};

export type DistrictFeatureCollection = {
    type: "FeatureCollection";
    features: DistrictFeature[];
};
