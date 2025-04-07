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

export default function NotesItems({ data, className, ...props }: INotesItems) {
  const [visibleItem, setVisibleItem] = useState(false);
  const sidebarStore = useSibebarStore();
  const { openModal } = useModalStore();
  const { setNodeRef } = useDroppable({
    id: data.id,
  });

  return (
    <div
      className={cn(styles["notes-items"], className)}
      {...props}
      ref={setNodeRef}
    >
      <div className={styles["notes-items__head"]}>
        <div className={styles["name"]}>
          <div className={styles["img"]}>
            <ColorSquare color={data.color} />
          </div>
          <p>{data.name}</p>
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
          data.notes.map((el) => <NotesItem key={el.id} note={el} />)}
        <AddNoteItem
          typeButton="note"
          onClick={() =>
            sidebarStore.openSidebar(
              <NoteSidebar title="Создать заметку" icon={<FileIcon />} />
            )
          }
        />
      </div>
    </div>
  );
}
