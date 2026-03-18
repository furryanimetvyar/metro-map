import {ItemTypeEnum} from "@/shared/model";
import type {FieldConfig} from "./types.ts";

type PointItemType =
    | typeof ItemTypeEnum.BusTramStation
    | typeof ItemTypeEnum.McdStation
    | typeof ItemTypeEnum.MckStation
    | typeof ItemTypeEnum.MetroStation

export const FORM_FIELDS_BY_TYPE: Record<PointItemType, FieldConfig[]> = {
    [ItemTypeEnum.BusTramStation]: [
        {
            name: 'name_mpv',
            label: 'Название',
            type: 'text',
            required: true,
            placeholder: 'Название остановки',
        },
        {
            name: 'address_mpv',
            label: 'Адрес',
            type: 'text',
            placeholder: 'Адрес остановки',
        },
        {
            name: 'rayon',
            label: 'Район',
            type: 'text',
            placeholder: 'Район',
        },
        {
            name: 'ao',
            label: 'Административный округ',
            type: 'text',
            placeholder: 'АО',
        },
        {
            name: 'marshrut',
            label: 'Маршруты',
            type: 'textarea',
            placeholder: 'Маршруты через остановку',
        },
        {
            name: 'CurLd',
            label: 'Текущая загрузка',
            type: 'text',
            placeholder: '0',
        },
        {
            name: 'CurLdRel',
            label: 'Текущая загрузка (отн.)',
            type: 'text',
            placeholder: '0%',
        },
        {
            name: 'DistOnFoot',
            label: 'Расстояние пешком',
            type: 'text',
            placeholder: '-',
        },
        {
            name: 'TimeOnFoot',
            label: 'Время пешком',
            type: 'text',
            placeholder: '-',
        },
    ],
    [ItemTypeEnum.McdStation]: [
        {
            name: 'name_station',
            label: 'Название станции',
            type: 'text',
            required: true,
            placeholder: 'Название станции',
        },
        {
            name: 'name_line',
            label: 'Линия',
            type: 'text',
            required: true,
            placeholder: 'Название линии',
        },
        {
            name: 'no_line',
            label: 'Номер линии',
            type: 'text',
            placeholder: 'МЦД-1',
        },
        {
            name: 'status',
            label: 'Статус',
            type: 'select',
            options: [
                { label: 'Действующая', value: 'Действующая' },
                { label: 'Планируемая', value: 'Планируемая' },
            ],
        },
        {
            name: 'area_full',
            label: 'Район',
            type: 'text',
            placeholder: 'Район',
        },
        {
            name: 'administrative_district_full',
            label: 'Административный округ',
            type: 'text',
            placeholder: 'Административный округ',
        },
        {
            name: 'transfer',
            label: 'Пересадка',
            type: 'select',
            options: [
                { label: 'Да', value: 'TRUE' },
                { label: 'Нет', value: 'FALSE' },
            ],
        },
        {
            name: 'pass',
            label: 'Пассажиропоток',
            type: 'number',
            placeholder: '0',
        },
        {
            name: 'CurLd',
            label: 'Текущая загрузка',
            type: 'text',
            placeholder: '0',
        },
        {
            name: 'CurLdRel',
            label: 'Текущая загрузка (отн.)',
            type: 'text',
            placeholder: '0%',
        },
        {
            name: 'DistOnFoot',
            label: 'Расстояние пешком',
            type: 'text',
            placeholder: '-',
        },
        {
            name: 'TimeOnFoot',
            label: 'Время пешком',
            type: 'text',
            placeholder: '-',
        },
    ],
    [ItemTypeEnum.MckStation]: [
        {
            name: 'name_station',
            label: 'Название станции',
            type: 'text',
            required: true,
            placeholder: 'Название станции',
        },
        {
            name: 'name_line',
            label: 'Линия',
            type: 'text',
            required: true,
            placeholder: 'Московское центральное кольцо',
        },
        {
            name: 'status',
            label: 'Статус',
            type: 'select',
            options: [
                { label: 'Действующая', value: 'Действующая' },
                { label: 'Планируемая', value: 'Планируемая' },
            ],
        },
        {
            name: 'area_full',
            label: 'Район',
            type: 'text',
            placeholder: 'Район',
        },
        {
            name: 'administrative_district_full',
            label: 'Административный округ',
            type: 'text',
            placeholder: 'Административный округ',
        },
        {
            name: 'transfer',
            label: 'Пересадка',
            type: 'select',
            options: [
                { label: 'Да', value: 'true' },
                { label: 'Нет', value: 'false' },
            ],
        },
        {
            name: 'pass',
            label: 'Пассажиропоток',
            type: 'number',
            placeholder: '0',
        },
        {
            name: 'bandwidth_input',
            label: 'Пропускная способность (вход)',
            type: 'number',
            placeholder: '0',
        },
        {
            name: 'bandwidth_output',
            label: 'Пропускная способность (выход)',
            type: 'number',
            placeholder: '0',
        },
        {
            name: 'CurLd',
            label: 'Текущая загрузка',
            type: 'text',
            placeholder: '0',
        },
        {
            name: 'CurLdRel',
            label: 'Текущая загрузка (отн.)',
            type: 'text',
            placeholder: '0%',
        },
        {
            name: 'DistOnFoot',
            label: 'Расстояние пешком',
            type: 'text',
            placeholder: '-',
        },
        {
            name: 'TimeOnFoot',
            label: 'Время пешком',
            type: 'text',
            placeholder: '-',
        },
    ],
    [ItemTypeEnum.MetroStation]: [
        {
            name: 'name_station',
            label: 'Название станции',
            type: 'text',
            required: true,
            placeholder: 'Название станции',
        },
        {
            name: 'name_line',
            label: 'Линия',
            type: 'text',
            required: true,
            placeholder: 'Название линии',
        },
        {
            name: 'no_line',
            label: 'Номер линии',
            type: 'text',
            placeholder: '1',
        },
        {
            name: 'status',
            label: 'Статус',
            type: 'select',
            options: [
                { label: 'Действующая', value: 'Действующая' },
                { label: 'Планируемая', value: 'Планируемая' },
            ],
        },
        {
            name: 'date',
            label: 'Год открытия',
            type: 'text',
            placeholder: '2024',
        },
        {
            name: 'area_full',
            label: 'Район',
            type: 'text',
            placeholder: 'Район',
        },
        {
            name: 'administrative_district_full',
            label: 'Административный округ',
            type: 'text',
            placeholder: 'Административный округ',
        },
        {
            name: 'transfer',
            label: 'Пересадка',
            type: 'select',
            options: [
                { label: 'Да', value: 'TRUE' },
                { label: 'Нет', value: 'FALSE' },
            ],
        },
        {
            name: 'pass',
            label: 'Пассажиропоток',
            type: 'number',
            placeholder: '0',
        },
        {
            name: 'bandwidth_input',
            label: 'Пропускная способность (вход)',
            type: 'number',
            placeholder: '0',
        },
        {
            name: 'bandwidth_output',
            label: 'Пропускная способность (выход)',
            type: 'number',
            placeholder: '0',
        },
        {
            name: 'CurLd',
            label: 'Текущая загрузка',
            type: 'text',
            placeholder: '0',
        },
        {
            name: 'CurLdRel',
            label: 'Текущая загрузка (отн.)',
            type: 'text',
            placeholder: '0%',
        },
        {
            name: 'DistOnFoot',
            label: 'Расстояние пешком',
            type: 'text',
            placeholder: '-',
        },
        {
            name: 'TimeOnFoot',
            label: 'Время пешком',
            type: 'text',
            placeholder: '-',
        },
    ],
}
