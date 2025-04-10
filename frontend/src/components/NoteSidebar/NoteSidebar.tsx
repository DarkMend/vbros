import styles from "./NoteSidebar.module.scss";
import BackIcon from "../../../public/icons/back.svg";
import NoteInfo from "./NoteInfo/NoteInfo";
import CalendarIcon from "../../../public/icons/calendar.svg";
import ModalButton from "../ModalButton/ModalButton";
import { useSibebarStore } from "../../store/sidebar.store";
import { useModalStore } from "../../store/modalStore";
import ChangeNoteStatusModal from "../Modals/ChangeNoteStatusModal/ChangeNoteStatusModal";
import { ReactNode, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { statusService } from "../../services/status.service";
import { useNoteStore } from "../../store/noteStore";
import DateModal from "../Modals/DateModal/DateModal";
import { useCreateNote } from "../../utils/hooks/Note/useCreateNote";
import { useForm } from "react-hook-form";
import { INote } from "../../interfaces/note.interface";
import { toast } from "react-toastify";

export interface INoteSidebar {
  title: string;
  icon: ReactNode;
}

export default function NoteSidebar({ title, icon }: INoteSidebar) {
  const { closeSidebar } = useSibebarStore();
  const { openModal } = useModalStore();
  const { status, date } = useNoteStore();

  const { data } = useQuery({
    queryKey: ["statuses"],
    queryFn: () => statusService.getPersonalStatuses(),
    select: (data) => data.data.data,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<INote>({
    mode: "onSubmit",
  });

  const { mutate: createMutate, isPending: createPending } = useCreateNote({
    onError(data) {
      toast.error(data.response?.data?.message);
    },
    onSuccess() {
      toast.success("Заметка успешно создана");
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

    createMutate({ ...data, status_id: status?.id, date: date });
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
        </div>
        <div className={styles.info}>
          {data ? (
            <NoteInfo
              text={status ? status?.name : ""}
              color={status?.color}
              onClick={() =>
                openModal(<ChangeNoteStatusModal statuses={data} />)
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
            ></textarea>
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
          isLoading={createPending}
          form="form"
          type="submit"
        >
          Сохранить
        </ModalButton>
      </div>
    </div>
  );
}
