import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/shared/ui";
import {Button} from "@/shared/ui/button.tsx";
import {type SubmitHandler, useForm} from "react-hook-form";
import {ItemType} from "@/shared/model";
import {Input} from "@/shared/ui/input.tsx";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/shared/ui/select.tsx";
import {MAP_ITEM_NAMES} from "@/shared/config/map-item-names.ts";
import {Textarea} from "@/shared/ui/textarea.tsx";
import {useCustomPointsStore} from "@/widgets/city-map/model/custom-points.store.ts";
import {useEffect} from "react";

type Inputs = {
    name: string,
    description: string,
    type: ItemType,
    latitude: number,
    longitude: number,
}

interface PointAddModalProps {
    open: boolean;
    onOpenChange: (isOpen: boolean) => void;
    initialCoordinates: number[]

}

function PointAddModal({open, onOpenChange, initialCoordinates}: PointAddModalProps) {
    const addCustomPoint = useCustomPointsStore((state) => state.addPoint)

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<Inputs>()

    useEffect(() => reset({
        name: "",
        description: "",
        type: ItemType.BusTramStation,
        longitude: initialCoordinates?.[0],
        latitude: initialCoordinates?.[1],
    }), [initialCoordinates, open])
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        addCustomPoint({
            type: "Feature",
            properties: {
                description: data.description,
                name: data.name,
                type: data.type
            },
            geometry: {
                type: "Point",
                coordinates: [Number(data.longitude), Number(data.latitude)],
            }
        })
        onOpenChange(false)
    }


    return (<Dialog open={open} onOpenChange={onOpenChange} >
        <DialogTrigger asChild>
            <Button>Добавить точку</Button>
        </DialogTrigger>


            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Информация о выбранном месте
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Широта</label>
                    <Input type={"number"} {...register("latitude")} defaultValue={initialCoordinates?.[1]} required/>
                    <label>Долгота</label>
                    <Input type={"number"} {...register("longitude")} defaultValue={initialCoordinates?.[0]} required/>
                    <Button type={"submit"} >Сохранить</Button>
                    <label>Тип точки</label>
                    <Select defaultValue={ItemType.BusTramStation} {...register("type")}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent
                            position={"popper"}
                        >
                            <SelectGroup>
                                {Object.values(ItemType).map((item: ItemType, index: number) => {
                                    return (<SelectItem value={item} key={index}>{MAP_ITEM_NAMES[item]}</SelectItem>)
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </form>
            </DialogContent>
    </Dialog>)
}
export default PointAddModal;