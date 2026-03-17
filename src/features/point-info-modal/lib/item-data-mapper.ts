import type {MapObjectClickPayload, ModalData} from "../model/types";
import {ItemType} from "@/shared/model/ItemTypeEnum.ts";
import type {TValue} from "@/shared/model";
import type {BusTramStationFeature} from "@/entities/bus-tram-station";
import type {DistrictFeature} from "@/entities/district";
import type {McdStationFeature} from "@/entities/mcd-station";
import type {MckStationFeature} from "@/entities/mck-station";
import type {MetroStationFeature} from "@/entities/metro-station";
import type {StreetsPedestrianFeature} from "@/entities/streets-pedestrian";
import {MAP_ITEM_NAMES} from "@/shared/config/map-item-names.ts";
import type {CustomPointFeature} from "@/entities/custom-points/model/types.ts";

const busTramFieldsMapper = (data: BusTramStationFeature): TValue<string>[] => {
    const [lng, lat] = data.geometry.coordinates;

    return [
        {
            title: 'Название',
            value: data.properties.name_mpv,
        },
        {
            title: 'Адрес',
            value: data.properties.address_mpv,
        },
        {
            title: 'Район',
            value: data.properties.rayon,
        },
        {
            title: 'Административный округ',
            value: data.properties.ao,
        },
        {
            title: 'Маршруты',
            value: data.properties.marshrut,
        },
        {
            title: 'Координаты',
            value: `${lat}, ${lng}`,
        },
        {
            title: 'Текущая загрузка',
            value: data.properties.CurLd,
        },
        {
            title: 'Текущая загрузка (отн.)',
            value: data.properties.CurLdRel,
        },
        {
            title: 'Расстояние пешком',
            value: data.properties.DistOnFoot,
        },
        {
            title: 'Время пешком',
            value: data.properties.TimeOnFoot,
        },
    ]
}

const districtFieldsMapper = (data: DistrictFeature): TValue<string>[] => {
    return [
        {
            title: 'Название',
            value: data.properties.NAME,
        },
        {
            title: 'Административный округ',
            value: data.properties.NAME_AO,
        },
    ]
}

const mcdStationFieldsMapper = (data: McdStationFeature): TValue<string>[] => {
    const [lng, lat] = data.geometry.coordinates;

    return [
        {
            title: 'Название',
            value: data.properties.name_station,
        },
        {
            title: 'Линия',
            value: data.properties.name_line,
        },
        {
            title: 'Номер линии',
            value: data.properties.no_line,
        },
        {
            title: 'Статус',
            value: data.properties.status,
        },
        {
            title: 'Район',
            value: data.properties.area_full,
        },
        {
            title: 'Административный округ',
            value: data.properties.administrative_district_full,
        },
        {
            title: 'Пересадка',
            value: data.properties.transfer,
        },
        {
            title: 'Координаты',
            value: `${lat}, ${lng}`,
        },
        {
            title: 'Пассажиропоток',
            value: data.properties.pass !== null ? String(data.properties.pass) : '-',
        },
        {
            title: 'Текущая загрузка',
            value: data.properties.CurLd,
        },
        {
            title: 'Текущая загрузка (отн.)',
            value: data.properties.CurLdRel,
        },
        {
            title: 'Расстояние пешком',
            value: data.properties.DistOnFoot,
        },
        {
            title: 'Время пешком',
            value: data.properties.TimeOnFoot,
        },
    ]
}

const mckStationFieldsMapper = (data: MckStationFeature): TValue<string>[] => {
    const [lng, lat] = data.geometry.coordinates;

    return [
        {
            title: 'Название',
            value: data.properties.name_station,
        },
        {
            title: 'Линия',
            value: data.properties.name_line,
        },
        {
            title: 'Статус',
            value: data.properties.status,
        },
        {
            title: 'Район',
            value: data.properties.area_full,
        },
        {
            title: 'Административный округ',
            value: data.properties.administrative_district_full,
        },
        {
            title: 'Пересадка',
            value: data.properties.transfer,
        },
        {
            title: 'Координаты',
            value: `${lat}, ${lng}`,
        },
        {
            title: 'Пассажиропоток',
            value: String(data.properties.pass),
        },
        {
            title: 'Пропускная способность (вход)',
            value: String(data.properties.bandwidth_input),
        },
        {
            title: 'Пропускная способность (выход)',
            value: String(data.properties.bandwidth_output),
        },
        {
            title: 'Текущая загрузка',
            value: data.properties.CurLd,
        },
        {
            title: 'Текущая загрузка (отн.)',
            value: data.properties.CurLdRel,
        },
        {
            title: 'Расстояние пешком',
            value: data.properties.DistOnFoot,
        },
        {
            title: 'Время пешком',
            value: data.properties.TimeOnFoot,
        },
    ]
}

const metroStationFieldsMapper = (data: MetroStationFeature): TValue<string>[] => {
    const [lng, lat] = data.geometry.coordinates;

    return [
        {
            title: 'Название',
            value: data.properties.name_station,
        },
        {
            title: 'Линия',
            value: data.properties.name_line,
        },
        {
            title: 'Номер линии',
            value: data.properties.no_line,
        },
        {
            title: 'Статус',
            value: data.properties.status,
        },
        {
            title: 'Год открытия',
            value: data.properties.date,
        },
        {
            title: 'Район',
            value: data.properties.area_full,
        },
        {
            title: 'Административный округ',
            value: data.properties.administrative_district_full,
        },
        {
            title: 'Пересадка',
            value: data.properties.transfer,
        },
        {
            title: 'Координаты',
            value: `${lat}, ${lng}`,
        },
        {
            title: 'Пассажиропоток',
            value: String(data.properties.pass),
        },
        {
            title: 'Пропускная способность (вход)',
            value: String(data.properties.bandwidth_input),
        },
        {
            title: 'Пропускная способность (выход)',
            value: String(data.properties.bandwidth_output),
        },
        {
            title: 'Текущая загрузка',
            value: data.properties.CurLd,
        },
        {
            title: 'Текущая загрузка (отн.)',
            value: data.properties.CurLdRel,
        },
        {
            title: 'Расстояние пешком',
            value: data.properties.DistOnFoot,
        },
        {
            title: 'Время пешком',
            value: data.properties.TimeOnFoot,
        },
    ]
}

const streetPedestrianFieldsMapper = (data: StreetsPedestrianFeature): TValue<string>[] => {
    return [
        {
            title: 'Название',
            value: data.properties.ST_NAME,
        },
        {
            title: 'Тип',
            value: data.properties.ST_TYP_BEF,
        },
        {
            title: 'Категория дороги',
            value: data.properties.ROAD_CATEG,
        },
        {
            title: 'Тип связи',
            value: data.properties.TYPE_LINK,
        },
        {
            title: 'Направление',
            value: data.properties.RoadDirect,
        },
        {
            title: 'Ширина',
            value: String(data.properties.Width),
        },
        {
            title: 'Макс. скорость (прямо)',
            value: String(data.properties.MaxSpdDrct),
        },
        {
            title: 'Средняя скорость (прямо)',
            value: String(data.properties.AvgSpdDrct),
        },
        {
            title: 'Функциональный класс',
            value: String(data.properties.FUNC_CLASS),
        },
    ]
}

const customPointFieldsMapper = (data: CustomPointFeature): TValue<string>[] => {
    const [lng, lat] = data.geometry.coordinates;

    return [
        {
            title: 'Название',
            value: data.properties.name,
        },
        {
            title: 'Тип',
            value: MAP_ITEM_NAMES[data.properties.type],
        },
        {
            title: 'Описание',
            value: data.properties.description,
        },
        {
            title: 'Координаты',
            value: `${lat}, ${lng}`,
        },
    ]
}

const FIELDS_MAPPERS = {
    [ItemType.BusTramStation]: busTramFieldsMapper,
    [ItemType.District]: districtFieldsMapper,
    [ItemType.McdStation]: mcdStationFieldsMapper,
    [ItemType.MckStation]: mckStationFieldsMapper,
    [ItemType.MetroStation]: metroStationFieldsMapper,
    [ItemType.StreetPedestrian]: streetPedestrianFieldsMapper,
    [ItemType.CustomPoint]: customPointFieldsMapper,
} as const;


export const itemDataMapper = (data: MapObjectClickPayload): ModalData => {
    return {
        title: MAP_ITEM_NAMES[data.itemType],
        params: FIELDS_MAPPERS[data.itemType](data.data as never)
    }
}