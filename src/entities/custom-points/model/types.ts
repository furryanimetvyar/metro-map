import type {ItemType} from "@/shared/model";

type CustomPointProperties = {
    name: string;
    type: ItemType;
    description: string;
};

type CustomPointGeometry = {
    type: "Point";
    coordinates: [number, number];
};

export type CustomPointFeature = {
    type: "Feature";
    properties: CustomPointProperties;
    geometry: CustomPointGeometry;
};

export type CustomPointFeatureCollection = {
    type: string;
    features: CustomPointFeature[];
};
