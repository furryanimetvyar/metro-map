import {ItemTypeEnum} from "@/shared/model";

export type FieldConfig = {
    name: string
    label: string
    type: 'text' | 'textarea' | 'number' | 'select'
    required?: boolean
    options?: Array<{ label: string; value: string }>
    placeholder?: string
}

export const POINT_TYPES = [
    ItemTypeEnum.BusTramStation,
    ItemTypeEnum.McdStation,
    ItemTypeEnum.MckStation,
    ItemTypeEnum.MetroStation,
] as const;

export type FormValues = Record<string, string | number>;

export type PointItemType = (typeof POINT_TYPES)[number];