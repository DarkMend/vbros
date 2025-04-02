import styles from "./NoteSidebar.module.scss";
import BackIcon from "../../../public/icons/back.svg";
import FileIcon from "../../../public/icons/file-outline.svg";
import NoteInfo from "./NoteInfo/NoteInfo";
import CalendarIcon from "../../../public/icons/calendar.svg";
import ModalButton from "../ModalButton/ModalButton";
import { useSibebarStore } from "../../store/sidebar.store";
import { useModalStore } from "../../store/modalStore";
import ChangeNoteStatusModal from "../Modals/ChangeNoteStatusModal/ChangeNoteStatusModal";

export default function NoteSidebar() {
  const { closeSidebar } = useSibebarStore();
  const { openModal } = useModalStore();

  return (
    <div className={styles.noteSidebar}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>
            <div className={styles.icon}>
              <FileIcon />
            </div>
            <div className={styles.text}>Новая заметка</div>
          </div>
        </div>
        <div className={styles.info}>
          <NoteInfo
            text="To do"
            color="#FF9D00"
            onClick={() => openModal(<ChangeNoteStatusModal />)}
          />
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
