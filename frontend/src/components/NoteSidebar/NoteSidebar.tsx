import styles from "./NoteSidebar.module.scss";
import BackIcon from "../../../public/icons/back.svg";
import NoteInfo from "./NoteInfo/NoteInfo";
import CalendarIcon from "../../../public/icons/calendar.svg";
import ModalButton from "../ModalButton/ModalButton";
import { useSibebarStore } from "../../store/sidebar.store";
import { useModalStore } from "../../store/modalStore";
import ChangeNoteStatusModal from "../Modals/ChangeNoteStatusModal/ChangeNoteStatusModal";
import { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { statusService } from "../../services/status.service";
import { useStatusStore } from "../../store/statusStore";

export interface INoteSidebar {
  title: string;
  icon: ReactNode;
}

export default function NoteSidebar({ title, icon }: INoteSidebar) {
  const { closeSidebar } = useSibebarStore();
  const { openModal } = useModalStore();
  const { status } = useStatusStore();

  const { data } = useQuery({
    queryKey: ["statuses"],
    queryFn: () => statusService.getPersonalStatuses(),
    select: (data) => data.data.data,
  });

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

          <NoteInfo text="03.01.2025" icon={<CalendarIcon />} />
        </div>
        <div className={styles.main}>
          <textarea
            name=""
            className={styles.textarea}
            placeholder="Введите текст"
          ></textarea>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.close} onClick={closeSidebar}>
          <div className={styles.closeSvg}>
            <BackIcon />
          </div>
          <div className={styles.closeText}>Назад</div>
        </button>
        <ModalButton className={styles.button}>Сохранить</ModalButton>
      </div>
    </div>
  );
}
