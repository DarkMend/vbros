import "react-loading-skeleton/dist/skeleton.css";
import styles from "./NotesItem.module.scss";
import cn from "classnames";
import { useDraggable } from "@dnd-kit/core";
import { INotesItem } from "./NotesItem.props";
import { useSibebarStore } from "../../../store/sidebar.store";
import NoteSidebar from "../../NoteSidebar/NoteSidebar";
import { Pencil } from "lucide-react";
import MenuIcon from "../../../../public/icons/menu-select.svg";
import { useNoteStore } from "../../../store/noteStore";

export default function NotesItem({ note }: INotesItem) {
  const { openSidebar } = useSibebarStore();
  const { allStatuses, setStatus, setDate } = useNoteStore();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: note.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    cursor: transform ? "grab" : "default",
  };

  const handleOpenSidebar = () => {
    const status = allStatuses?.find((status) => status.id === note.status_id);
    if (status) {
      setStatus(status);
    }
    setDate(note.date);

    openSidebar(
      <NoteSidebar title="Обновление заметки" icon={<Pencil />} update={note} />
    );
  };

  return (
    <div
      className={cn(styles["notes-item"])}
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      role="button"
    >
      <div className={styles.notesItemWrapper}>
        <div className={styles["description"]}>{note.description}</div>
        <button onPointerDown={handleOpenSidebar} className={styles.menuButton}>
          <MenuIcon />
        </button>
      </div>
    </div>
  );
}
