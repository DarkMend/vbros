import styles from "./NoteSidebar.module.scss";
import BackIcon from "../../../public/icons/back.svg";
import FileIcon from "../../../public/icons/file-outline.svg";
import NoteInfo from "./NoteInfo/NoteInfo";

export default function NoteSidebar() {
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
          <NoteInfo text="To do" color="#FF9D00" />
        </div>
        <div className={styles.main}></div>
      </div>
      <div className={styles.close}>
        <div className={styles.closeSvg}>
          <BackIcon />
        </div>
        <div className={styles.closeText}>Назад</div>
      </div>
    </div>
  );
}
