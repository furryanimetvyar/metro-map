export const ItemType = {
    BusTramStation: 'bus-tram-station',
    District: 'district',
    McdStation: 'mcd-station',
    MckStation: 'mck-station',
    MetroStation: 'metro-station',
    StreetPedestrian: 'street-pedestrian',
    CustomPoint: 'custom-point',
} as const;

export type ItemType = (typeof ItemType)[keyof typeof ItemType];
