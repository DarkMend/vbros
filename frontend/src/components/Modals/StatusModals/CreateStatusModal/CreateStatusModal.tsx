import { ClipboardPlus, Palette } from "lucide-react";
import ModalLayout from "../../../ModalLayout/ModalLayout";
import styles from "./CreateStatusModal.module.scss";
import ParagraphModal from "../../../ParagraphModal/ParagraphModal";
import ModalMenuItem from "../../../ModalMenuItem/ModalMenuItem";
import { useState } from "react";
import SeparationLine from "../../../SeparationLine/SeparationLine";
import MainInput from "../../../MainInput/MainInput";
import { useForm } from "react-hook-form";
import ModalFormLayout from "../../../ModalFormLayout/ModalFormLayout";
import { IStatus } from "../../../../interfaces/status.interface";
import { useCreateStatus } from "../../../../utils/hooks/Status/useCreateStatus";
import { toast } from "react-toastify";
import { useModalStore } from "../../../../store/modalStore";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateStatusModal() {
  const [color, setColor] = useState("#FF9D00");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IStatus>();
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();

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

  const onSubmit = (data: IStatus) => {
    mutate({ ...data, color });
  };

  return (
    <ModalLayout icon={<ClipboardPlus />} title="Добавить статус блок">
      <div className={styles.status}>
        <ParagraphModal>
          Здесь вы сможете создать свой статус блок.
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
          submitButtonText="Создать"
          isPending={isPending}
          onSubmit={handleSubmit(onSubmit)}
          closeHandle={closeModal}
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
