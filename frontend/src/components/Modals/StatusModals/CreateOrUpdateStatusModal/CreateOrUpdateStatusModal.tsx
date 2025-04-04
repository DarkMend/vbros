import { ClipboardPlus, Palette, Pencil } from "lucide-react";
import ModalLayout from "../../../ModalLayout/ModalLayout";
import styles from "./CreateOrUpdateStatusModal.module.scss";
import ParagraphModal from "../../../ParagraphModal/ParagraphModal";
import ModalMenuItem from "../../../ModalMenuItem/ModalMenuItem";
import { useState } from "react";
import SeparationLine from "../../../SeparationLine/SeparationLine";
import MainInput from "../../../MainInput/MainInput";
import { useForm } from "react-hook-form";
import ModalFormLayout from "../../../ModalFormLayout/ModalFormLayout";
import {
  IStatus,
  IStatusWithNotes,
} from "../../../../interfaces/status.interface";
import { useCreateStatus } from "../../../../utils/hooks/Status/useCreateStatus";
import { toast } from "react-toastify";
import { useModalStore } from "../../../../store/modalStore";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateStatus } from "../../../../utils/hooks/Status/useUpdateStatus";
import ModalConfirmation from "../../../ModalConfirmation/ModalConfirmation";
import { useDeleteStatusHook } from "./useDeleteStatus";

export interface ICreateOrUpdateStatusModal {
  update?: IStatusWithNotes;
}

export default function CreateOrUpdateStatusModal({
  update,
}: ICreateOrUpdateStatusModal) {
  const [color, setColor] = useState(update ? update.color : "#FF9D00");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IStatus>({
    defaultValues: {
      name: update?.name,
    },
  });
  const { closeModal, changeContent } = useModalStore();
  const queryClient = useQueryClient();

  // Cоздание
  const { mutate, isPending } = useCreateStatus({
    onError(data) {
      toast.error(data.response?.data?.message);
    },
    onSuccess() {
      reset();
      toast.success("Статус успешно создан");
      queryClient.invalidateQueries({ queryKey: ["statuses"] });
    },
  });

  // Редактирование
  const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateStatus({
    onError(data) {
      toast.error(data.response?.data?.message);
    },
    onSuccess() {
      toast.success("Статус успешно обновлен");
      queryClient.invalidateQueries({ queryKey: ["statuses"] });
    },
  });

  const onSubmit = (data: IStatus) => {
    update
      ? updateMutate({ ...data, color, id: update.id })
      : mutate({ ...data, color });
  };

  const deleteStatus = () => {
    update &&
      changeContent(
        <ModalConfirmation
          text="Вы точно хотите удалить статус и все находящиеся заметки в нём?"
          backAction={() =>
            changeContent(<CreateOrUpdateStatusModal update={update} />)
          }
          id={update.id}
          handleConfirmation={useDeleteStatusHook}
        />
      );
  };

  return (
    <ModalLayout
      icon={update ? <Pencil /> : <ClipboardPlus />}
      title={update ? "Редактирование статуса" : "Добавить статус блок"}
    >
      <div className={styles.status}>
        <ParagraphModal>
          {update
            ? "Здесь вы сможете обновить свой статус блок"
            : "Здесь вы сможете создать свой статус блок"}
        </ParagraphModal>
        <ParagraphModal>
          Для изменения цвета нажмите на квадратик с цветом
        </ParagraphModal>
        <SeparationLine />
        <ModalMenuItem
          icon={<Palette />}
          name="Выберите цвет"
          nameHover={false}
          overflowHidden={false}
          colorPicker={true}
          color={color}
          setColor={setColor}
        />
        <SeparationLine />
        <ModalFormLayout
          submitButtonText={update ? "Обновить" : "Создать"}
          isPending={isPending || isUpdatePending}
          onSubmit={handleSubmit(onSubmit)}
          closeHandle={closeModal}
          deleteButton={update && deleteStatus}
        >
          <MainInput
            placeholder="Название"
            {...register("name", {
              required: "Заполните название статуса",
            })}
            errorMessage={errors?.name?.message}
          />
        </ModalFormLayout>
      </div>
    </ModalLayout>
  );
}
