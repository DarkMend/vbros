import styles from "./NoteSidebar.module.scss";
import BackIcon from "../../../public/icons/back.svg";
import NoteInfo from "./NoteInfo/NoteInfo";
import CalendarIcon from "../../../public/icons/calendar.svg";
import ModalButton from "../ModalButton/ModalButton";
import { useSibebarStore } from "../../store/sidebar.store";
import { useModalStore } from "../../store/modalStore";
import ChangeNoteStatusModal from "../Modals/ChangeNoteStatusModal/ChangeNoteStatusModal";
import { ReactNode, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNoteStore } from "../../store/noteStore";
import DateModal from "../Modals/DateModal/DateModal";
import { useCreateNote } from "../../utils/hooks/Note/useCreateNote";
import { useForm } from "react-hook-form";
import { INote } from "../../interfaces/note.interface";
import { toast } from "react-toastify";
import { useUpdateNote } from "../../utils/hooks/Note/useUpdateNote";
import { useDeleteNote } from "../../utils/hooks/Note/useDeleteNote";

export interface INoteSidebar {
  title: string;
  icon: ReactNode;
  update?: INote;
}

export default function NoteSidebar({ title, icon, update }: INoteSidebar) {
  const { closeSidebar } = useSibebarStore();
  const { openModal } = useModalStore();
  const { status, date, allStatuses } = useNoteStore();
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<INote>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (!update) {
      reset({
        description: "",
      });
    } else {
      reset({
        description: update?.description,
      });
    }
  }, [reset, update]);

  // create note
  const { mutate: createMutate, isPending: createPending } = useCreateNote({
    onError(data) {
      toast.error(data.response?.data?.message);
    },
    onSuccess() {
      toast.success("Заметка успешно создана");
      queryClient.invalidateQueries({ queryKey: ["statuses"] });
      closeSidebar();
    },
  });

  // update note

  const { mutate: updateMutate, isPending: updatePending } = useUpdateNote({
    onError(data) {
      toast.error(data.response?.data?.message);
    },
    onSuccess() {
      toast.success("Заметка успешно обновлена");
      queryClient.invalidateQueries({ queryKey: ["statuses"] });
    },
  });

  // delete note
  const { mutate: deleteMutate, isPending: deletePending } = useDeleteNote({
    onError(data) {
      toast.error(data.response?.data?.message);
    },
    onSuccess() {
      toast.success("Заметка успешно удалена");
      queryClient.invalidateQueries({ queryKey: ["statuses"] });
      closeSidebar();
    },
  });

  const createNote = (data: INote) => {
    if (!status) {
      return toast.error("Выберите статус");
    }

    if (!date) {
      return toast.error("Выберите дату");
    }

    if (update) {
      updateMutate({
        ...data,
        status_id: status.id,
        date: date,
        id: update.id,
      });
    } else {
      createMutate({ ...data, status_id: status?.id, date: date });
    }
  };

  useEffect(() => {
    if (errors.description) toast.error(errors.description.message);
  }, [errors.description]);

  return (
    <div className={styles.noteSidebar}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.text}>{title}</div>
          </div>
          {update && (
            <ModalButton
              typeButton="delete"
              textNone={true}
              className={styles.deleteButton}
              onClick={() => {
                deleteMutate(update.id);
              }}
              isLoading={deletePending}
            >
              Удалить
            </ModalButton>
          )}
        </div>
        <div className={styles.info}>
          {allStatuses ? (
            <NoteInfo
              text={status ? status?.name : ""}
              color={status?.color}
              onClick={() =>
                openModal(<ChangeNoteStatusModal statuses={allStatuses} />)
              }
            />
          ) : (
            "Нету"
          )}

          <NoteInfo
            text={date?.toLocaleDateString()}
            icon={<CalendarIcon />}
            onClick={() => openModal(<DateModal />)}
          />
        </div>
        <div className={styles.main}>
          <form onSubmit={handleSubmit(createNote)} id="form">
            <textarea
              {...register("description", {
                required: "Введите заметку",
              })}
              className={styles.textarea}
              placeholder="Введите заметку"
            />
          </form>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.close} onClick={closeSidebar}>
          <div className={styles.closeSvg}>
            <BackIcon />
          </div>
          <div className={styles.closeText}>Назад</div>
        </button>
        <ModalButton
          className={styles.button}
          isLoading={createPending || updatePending}
          form="form"
          type="submit"
        >
          {update ? "Сохранить" : "Создать"}
        </ModalButton>
      </div>
    </div>
  );
}
