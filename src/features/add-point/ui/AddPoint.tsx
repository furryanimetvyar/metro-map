import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';

import {
  Input,
  Button,
  Textarea,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { ItemTypeEnum } from '@/shared/model';
import { MAP_ITEM_NAMES } from '@/shared/config';

import { FORM_FIELDS_BY_TYPE } from '../model/form-fields.ts';
import {
  type FieldConfig,
  type FormValues,
  POINT_TYPES,
  type PointItemType,
} from '../model/types.ts';

interface PointAddModalProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  initialCoordinates: number[];
  onCreatePoint: (pointData: FormValues, coordinates: [number, number]) => void;
}

export default function AddPoint({
  open,
  onOpenChange,
  initialCoordinates,
  onCreatePoint,
}: PointAddModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      type: ItemTypeEnum.BusTramStation,
    },
  });

  const selectedType = watch('type') as PointItemType;
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

  const getFieldClassName = (hasError: boolean) =>
    hasError ? 'border-red-500 focus-visible:ring-red-500' : '';

  const renderField = (field: FieldConfig) => {
    const hasError = Boolean(errors[field.name]);

    switch (field.type) {
      case 'text':
      case 'number':
        return (
          <div key={field.name} className="flex flex-col gap-1">
            <label className="text-sm font-medium">{field.label}</label>
            <Input
              type={field.type}
              className={getFieldClassName(hasError)}
              placeholder={field.placeholder}
              {...register(field.name, { required: field.required })}
            />
            {errors[field.name] && (
              <div className="text-sm text-red-500">Это обязательное поле</div>
            )}
          </div>
        );
      case 'textarea':
        return (
          <div key={field.name} className="flex flex-col gap-1">
            <label className="text-sm font-medium">{field.label}</label>
            <Textarea
              placeholder={field.placeholder}
              className={getFieldClassName(hasError)}
              {...register(field.name, { required: field.required })}
            />
            {errors[field.name] && (
              <div className="text-sm text-red-500">Это обязательное поле</div>
            )}
          </div>
        );
      case 'select':
        return (
          <div key={field.name} className="flex flex-col gap-1">
            <label className="text-sm font-medium">{field.label}</label>
            <Controller
              name={field.name}
              control={control}
              rules={{ required: field.required }}
              render={({ field: controllerField }) => (
                <Select
                  value={controllerField.value as string}
                  onValueChange={controllerField.onChange}
                >
                  <SelectTrigger className={getFieldClassName(hasError)}>
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  {errors[field.name] && (
                    <div className="text-sm text-red-500">Это обязательное поле</div>
                  )}
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
      <DialogContent className="max-h-[85vh] flex flex-col">
        <DialogHeader className="p-1">
          <DialogTitle>Добавить точку</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 gap-2 overflow-y-auto flex flex-col p-1 pr-4 mr-[-16px]">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Широта</label>
              <Input type="number" step="any" {...register('latitude')} required />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Долгота</label>
              <Input type="number" step="any" {...register('longitude')} required />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Тип точки</label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
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
          </div>

          <Button type="submit" className="mt-2">
            Сохранить
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
