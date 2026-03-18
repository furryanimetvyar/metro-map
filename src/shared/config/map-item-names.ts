import {ItemTypeEnum} from "../model";

export const MAP_ITEM_NAMES: Record<ItemTypeEnum, string> = {
    [ItemTypeEnum.BusTramStation]: 'Автобусная/трамвайная остановка',
    [ItemTypeEnum.District]: 'Район',
    [ItemTypeEnum.McdStation]: 'Станция МЦД',
    [ItemTypeEnum.MckStation]: 'Станция МЦК',
    [ItemTypeEnum.MetroStation]: 'Станция метро',
    [ItemTypeEnum.StreetPedestrian]: 'Пешеходная улица',
}