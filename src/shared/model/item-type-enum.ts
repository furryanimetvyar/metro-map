export const ItemTypeEnum = {
    BusTramStation: 'bus-tram-station',
    District: 'district',
    McdStation: 'mcd-station',
    MckStation: 'mck-station',
    MetroStation: 'metro-station',
    StreetPedestrian: 'street-pedestrian',
} as const;

export type ItemType = (typeof ItemTypeEnum)[keyof typeof ItemTypeEnum];
