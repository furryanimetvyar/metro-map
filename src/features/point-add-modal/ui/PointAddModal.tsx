import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import {useEffect} from "react";

import {Input, Button, Textarea, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/shared/ui";
import {ItemTypeEnum} from "@/shared/model";
import {MAP_ITEM_NAMES} from "@/shared/config";

import {FORM_FIELDS_BY_TYPE} from "../model/form-fields.ts";
import {type FieldConfig, type FormValues, POINT_TYPES, type PointItemType} from "../model/types.ts";

interface PointAddModalProps {
    open: boolean;
    onOpenChange: (isOpen: boolean) => void;
    initialCoordinates: number[];
    onCreatePoint: (pointData: FormValues, coordinates: [number, number]) => void;
}

export default function PointAddModal({open, onOpenChange, initialCoordinates, onCreatePoint}: PointAddModalProps) {

    const {register, handleSubmit, reset, watch, control} = useForm<FormValues>({
        defaultValues: {
            type: ItemTypeEnum.BusTramStation,
        },
    });

    const selectedType = watch("type") as PointItemType;
    const fields = FORM_FIELDS_BY_TYPE[selectedType] ?? [];

    useEffect(() => {
        reset({
            type: ItemTypeEnum.BusTramStation,
            longitude: initialCoordinates?.[0],
            latitude: initialCoordinates?.[1],
        });
    }, [initialCoordinates, open, reset]);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const coordinates: [number, number] = [Number(data.longitude), Number(data.latitude)];

        onCreatePoint(data, coordinates);
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
