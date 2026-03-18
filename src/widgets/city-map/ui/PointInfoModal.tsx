import type { TValue } from '@/shared/model';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui';

import type { MapObjectClickPayload, ModalData } from '../model/types.ts';
import { itemDataMapper } from '../lib/item-data-mapper.ts';

type PointInfoModalProps = {
  open: boolean;
  modalData: MapObjectClickPayload | null;
  onOpenChange: (open: boolean) => void;
};

const DEFAULT_MODAL_DATA: ModalData = {
  title: 'Информация о выбранном объекте',
  params: [],
};

function PointInfoModal({ open, onOpenChange, modalData }: PointInfoModalProps) {
  const modalProcessedData = modalData ? itemDataMapper(modalData) : DEFAULT_MODAL_DATA;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{modalProcessedData.title}</DialogTitle>
        </DialogHeader>
        {modalProcessedData.params.map((item: TValue<string>, index: number) => (
          <div key={index}>
            {item.title} - {item.value}
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
}
export default PointInfoModal;
