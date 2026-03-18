import {ItemType} from "../model";

export const MAP_ITEM_NAMES: Record<ItemType, string> = {
    [ItemType.BusTramStation]: 'Автобусная/трамвайная остановка',
    [ItemType.District]: 'Район',
    [ItemType.McdStation]: 'Станция МЦД',
    [ItemType.MckStation]: 'Станция МЦК',
    [ItemType.MetroStation]: 'Станция метро',
    [ItemType.StreetPedestrian]: 'Пешеходная улица',
}