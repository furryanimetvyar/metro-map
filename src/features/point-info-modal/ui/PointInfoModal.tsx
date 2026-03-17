import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/shared/ui";
import type {MapObjectClickPayload, ModalData} from "@/features/point-info-modal/model/types.ts";
import {itemDataMapper} from "@/features/point-info-modal/lib/item-data-mapper.ts";
import type {TValue} from "@/shared/model";

type PointInfoModalProps = {
    open: boolean;
    modalData: MapObjectClickPayload | null,
    onOpenChange: (open: boolean) => void;
};

const DEFAULT_MODAL_DATA: ModalData = {
    title: "Информация о выбранном объекте",
    params: []
}

function PointInfoModal({ open, onOpenChange, modalData}: PointInfoModalProps) {
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
            </DialogContent>
    </Dialog>)
}
export default PointInfoModal;