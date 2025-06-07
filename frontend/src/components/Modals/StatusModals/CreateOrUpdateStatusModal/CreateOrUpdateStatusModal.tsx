import { ClipboardPlus, Palette, Pencil, SquareCheckBig } from "lucide-react";
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
import {
  useDeleteStatusHook,
  useDeleteStatusProjectHook,
} from "./useDeleteStatus";
import { useCreateStatusProject } from "../../../../utils/hooks/StatusProject/useCreateStatusProject";
import { IStatusProjectWithTasks } from "../../../../interfaces/statusProject";
import { useUpdateStatusProject } from "../../../../utils/hooks/StatusProject/useUpdateStatusProject";

export interface ICreateOrUpdateStatusModal {
  update?: IStatusWithNotes;
  statusProjectId?: number;
  statusProject?: IStatusProjectWithTasks;
}

export default function CreateOrUpdateStatusModal({
  update,
  statusProject,
  statusProjectId,
}: ICreateOrUpdateStatusModal) {
  const [color, setColor] = useState(
    update ? update.color : statusProject ? statusProject.color : "#FF9D00"
  );
  const [checked, setChecked] = useState<boolean>(
    statusProject ? statusProject.is_final : false
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IStatus>({
    defaultValues: {
      name: update?.name || statusProject?.name,
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
      closeModal();
    },
  });

  // Создание статуса в проекте

  const { mutate: createStatusProject, isPending: isPendingStatusProject } =
    useCreateStatusProject({
      onError(data) {
        toast.error(data.response?.data?.message);
      },
      onSuccess() {
        reset();
        toast.success("Статус успешно создан");
        queryClient.invalidateQueries({
          queryKey: ["projectStatuses", statusProjectId],
        });
        closeModal();
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

  // Редактирование статуса у проекта

  const {
    mutate: updateStatusProject,
    isPending: isUpdateStatusProjectPending,
  } = useUpdateStatusProject({
    onError(data) {
      toast.error(data.response?.data?.message);
    },
    onSuccess() {
      toast.success("Статус успешно обновлен");
      queryClient.invalidateQueries({
        queryKey: ["projectStatuses", statusProject?.project_id],
      });
    },
  });

  const onSubmit = (data: IStatus) => {
    if (update) {
      updateMutate({ ...data, color, id: update.id });
    } else if (statusProject) {
      updateStatusProject({
        ...data,
        color,
        project_id: statusProject.project_id,
        id: statusProject.id,
        is_final: checked,
      });
    } else {
      if (statusProjectId) {
        createStatusProject({
          ...data,
          color,
          project_id: statusProjectId,
          is_final: checked,
        });
      } else {
        mutate({ ...data, color });
      }
    }
  };

  const openModalConfirmatinDeleteStatus = () => {
    if (update) {
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
    } else if (statusProject) {
      changeContent(
        <ModalConfirmation
          text="Вы точно хотите удалить статус и все находящиеся задачи в нём?"
          backAction={() =>
            changeContent(
              <CreateOrUpdateStatusModal statusProject={statusProject} />
            )
          }
          id={statusProject.id}
          handleConfirmation={useDeleteStatusProjectHook}
        />
      );
    }
  };

  return (
    <ModalLayout
      icon={update || statusProject ? <Pencil /> : <ClipboardPlus />}
      title={
        update || statusProject
          ? "Редактирование статуса"
          : "Добавить статус блок"
      }
    >
      <div className={styles.status}>
        <ParagraphModal>
          {update || statusProject
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
          submitButtonText={update || statusProject ? "Обновить" : "Создать"}
          isPending={
            isPending ||
            isUpdatePending ||
            isPendingStatusProject ||
            isUpdateStatusProjectPending
          }
          onSubmit={handleSubmit(onSubmit)}
          closeHandle={closeModal}
          deleteButton={
            (update || statusProject) && openModalConfirmatinDeleteStatus
          }
        >
          <MainInput
            placeholder="Название"
            {...register("name", {
              required: "Заполните название статуса",
            })}
            errorMessage={errors?.name?.message}
          />

          {statusProjectId || statusProject ? (
            <ModalMenuItem
              name="Завершающий блок"
              icon={<SquareCheckBig />}
              nameHover={false}
              color={color}
              doneFinalBlock={true}
              value={checked}
              setValue={setChecked}
            />
          ) : (
            ""
          )}
        </ModalFormLayout>
      </div>
    </ModalLayout>
  );
}
