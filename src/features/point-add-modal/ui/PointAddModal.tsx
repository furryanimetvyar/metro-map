import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/shared/ui";
import {Button} from "@/shared/ui/button.tsx";
import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import {ItemType} from "@/shared/model";
import {Input} from "@/shared/ui/input.tsx";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/shared/ui/select.tsx";
import {MAP_ITEM_NAMES} from "@/shared/config/map-item-names.ts";
import {Textarea} from "@/shared/ui/textarea.tsx";
import {userPointsStore} from "@/widgets/city-map/model/userPointsStore.ts";
import {useEffect} from "react";
import {FORM_FIELDS_BY_TYPE} from "../model/form-fields.ts";
import type {FieldConfig} from "../model/types.ts";
import type {BusTramStationFeature} from "@/entities/bus-tram-station";
import type {McdStationFeature} from "@/entities/mcd-station";
import type {MckStationFeature} from "@/entities/mck-station";
import type {MetroStationFeature} from "@/entities/metro-station";

const POINT_TYPES = [
    ItemType.BusTramStation,
    ItemType.McdStation,
    ItemType.MckStation,
    ItemType.MetroStation,
] as const;

type PointItemType = (typeof POINT_TYPES)[number];

type FormValues = Record<string, string | number>;

interface PointAddModalProps {
    open: boolean;
    onOpenChange: (isOpen: boolean) => void;
    initialCoordinates: number[];
}

function PointAddModal({open, onOpenChange, initialCoordinates}: PointAddModalProps) {
    const addBusTramStation = userPointsStore((state) => state.addBusTramStation);
    const addMcdStation = userPointsStore((state) => state.addMcdStation);
    const addMckStation = userPointsStore((state) => state.addMckStation);
    const addMetroStation = userPointsStore((state) => state.addMetroStation);

    const {register, handleSubmit, reset, watch, control} = useForm<FormValues>({
        defaultValues: {
            type: ItemType.BusTramStation,
        },
    });

    const selectedType = watch("type") as PointItemType;
    const fields = FORM_FIELDS_BY_TYPE[selectedType] ?? [];

    useEffect(() => {
        reset({
            type: ItemType.BusTramStation,
            longitude: initialCoordinates?.[0],
            latitude: initialCoordinates?.[1],
        });
    }, [initialCoordinates, open, reset]);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const coordinates: [number, number] = [Number(data.longitude), Number(data.latitude)];
        const type = data.type as PointItemType;

        const properties: Record<string, unknown> = {};
        for (const field of FORM_FIELDS_BY_TYPE[type]) {
            properties[field.name] = data[field.name] ?? "";
        }

        switch (type) {
            case ItemType.BusTramStation:
                addBusTramStation({
                    type: "Feature",
                    properties: {...properties, icon: ""} as BusTramStationFeature["properties"],
                    geometry: {type: "Point", coordinates},
                });
                break;
            case ItemType.McdStation:
                addMcdStation({
                    type: "Feature",
                    properties: {...properties, icon: ""} as McdStationFeature["properties"],
                    geometry: {type: "Point", coordinates},
                });
                break;
            case ItemType.MckStation:
                addMckStation({
                    type: "Feature",
                    properties: {...properties, icon: ""} as MckStationFeature["properties"],
                    geometry: {type: "Point", coordinates},
                });
                break;
            case ItemType.MetroStation:
                addMetroStation({
                    type: "Feature",
                    properties: {...properties, icon: ""} as MetroStationFeature["properties"],
                    geometry: {type: "Point", coordinates},
                });
                break;

        }

        onOpenChange(false);
    };

    const renderField = (field: FieldConfig) => {
        switch (field.type) {
            case 'text':
            case 'number':
                return (
                    <div key={field.name} className="flex flex-col gap-1">
                        <label className="text-sm font-medium">{field.label}</label>
                        <Input
                            type={field.type}
                            placeholder={field.placeholder}
                            {...register(field.name, {required: field.required})}
                        />
                    </div>
                );
            case 'textarea':
                return (
                    <div key={field.name} className="flex flex-col gap-1">
                        <label className="text-sm font-medium">{field.label}</label>
                        <Textarea
                            placeholder={field.placeholder}
                            {...register(field.name, {required: field.required})}
                        />
                    </div>
                );
            case 'select':
                return (
                    <div key={field.name} className="flex flex-col gap-1">
                        <label className="text-sm font-medium">{field.label}</label>
                        <Controller
                            name={field.name}
                            control={control}
                            rules={{required: field.required}}
                            render={({field: controllerField}) => (
                                <Select
                                    value={controllerField.value as string}
                                    onValueChange={controllerField.onChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={field.placeholder} />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectGroup>
                                            {field.options?.map((opt) => (
                                                <SelectItem value={opt.value} key={opt.value}>
                                                    {opt.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                );
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button>Добавить точку</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Добавить точку</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Широта</label>
                        <Input type="number" step="any" {...register("latitude")} required />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Долгота</label>
                        <Input type="number" step="any" {...register("longitude")} required />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Тип точки</label>
                        <Controller
                            name="type"
                            control={control}
                            render={({field}) => (
                                <Select value={field.value as string} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectGroup>
                                            {POINT_TYPES.map((item) => (
                                                <SelectItem value={item} key={item}>
                                                    {MAP_ITEM_NAMES[item]}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                    {fields.map(renderField)}
                    <Button type="submit" className="mt-2">Сохранить</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default PointAddModal;
