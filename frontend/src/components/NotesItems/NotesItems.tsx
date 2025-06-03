import { INotesItems } from "./NotesItems.props";
import NotesItem from "./NotesItem/NotesItem";
import styles from "./NotesItems.module.scss";
import cn from "classnames";
import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import MenuSelectIcon from "./../../../public/icons/menu-select.svg";
import AddNoteItem from "./AddNoteItem/AddNoteItem";
import { useSibebarStore } from "../../store/sidebar.store";
import NoteSidebar from "../NoteSidebar/NoteSidebar";
import ColorSquare from "../ColorSquare/ColorSquare";
import { useModalStore } from "../../store/modalStore";
import CreateStatusModal from "../Modals/StatusModals/CreateOrUpdateStatusModal/CreateOrUpdateStatusModal";
import FileIcon from "../../../public/icons/file-outline.svg";
import { useNoteStore } from "../../store/noteStore";

export default function NotesItems({ data, className, ...props }: INotesItems) {
  const [visibleItem, setVisibleItem] = useState(false);
  const { openSidebar } = useSibebarStore();
  const { openModal } = useModalStore();
  const { setStatus, setDate } = useNoteStore();
  const { setNodeRef, isOver } = useDroppable({
    id: data.id,
  });

  const openCreateNoteSidebar = () => {
    setStatus(data);
    setDate(new Date());
    openSidebar(<NoteSidebar title="Создать заметку" icon={<FileIcon />} />);
  };

  return (
    <div
      className={cn(styles["notes-items"], className)}
      {...props}
      ref={setNodeRef}
    >
      <div
        className={cn(styles.over, {
          [styles.active]: isOver,
        })}
      >
        <div className={styles.overWrapper}>
          <div>
            <FileIcon />
          </div>
          <p>Переместить сюда</p>
        </div>
      </div>
      <div className={styles["notes-items__head"]}>
        <div className={styles["name"]}>
          <div className={styles["img"]}>
            <ColorSquare color={data.color} />
          </div>
          <div className={styles.nameWrapper}>
            <div className={cn(styles.statusHover)}>{data.name}</div>
            <div className={styles.nameP}>{data.name}</div>
          </div>
        </div>
        <div className={styles["actions"]}>
          <div
            className={cn(styles["actions__item"], styles["eye"])}
            onClick={() => setVisibleItem((state) => !state)}
          >
            <img
              src={!visibleItem ? "./icons/eye.svg" : "./icons/close-eye.svg"}
              alt=""
            />
          </div>
          <button
            className={cn(styles["actions__item"])}
            onClick={() => openModal(<CreateStatusModal update={data} />)}
          >
            <MenuSelectIcon />
          </button>
        </div>
      </div>
      <div
        className={cn(styles["notes-items__wrapper"], {
          [styles["visible-items"]]: visibleItem,
        })}
      >
        {data.notes &&
          data.notes
            .sort(
              (a, b) =>
                new Date(a.updated_at).getTime() -
                new Date(b.updated_at).getTime()
            )
            .map((el) => <NotesItem key={el.id} note={el} />)}
        <AddNoteItem typeButton="note" onClick={openCreateNoteSidebar} />
      </div>
    </div>
  );
}
