import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/shared/ui";
import type {MapObjectClickPayload, ModalData} from "@/features/point-info-modal/model/types.ts";
import {itemDataMapper} from "@/features/point-info-modal/lib/item-data-mapper.ts";
import type {TValue} from "@/shared/model";
import {Button} from "@/shared/ui/button.tsx";

type PointInfoModalProps = {
    open: boolean;
    modalData: MapObjectClickPayload | null,
    onOpenChange: (open: boolean) => void;
    onNewPointAdd: () => void;
};

const DEFAULT_MODAL_DATA: ModalData = {
    title: "Информация о выбранном объекте",
    params: []
}

function PointInfoModal({ open, onOpenChange, modalData, onNewPointAdd}: PointInfoModalProps) {
    const modalProcessedData = modalData ? itemDataMapper(modalData) : DEFAULT_MODAL_DATA;

    return (<Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {modalProcessedData.title}
                    </DialogTitle>
                </DialogHeader>
                {modalProcessedData.params.map((item: TValue<string>, index: number) =>
                    <div key={index}>
                        {item.title} - {item.value}
                    </div>
                )}
                <DialogFooter>
                    <Button onClick={onNewPointAdd}>Добавить новую точку сюда</Button>
                </DialogFooter>
            </DialogContent>
    </Dialog>)
}
export default PointInfoModal;