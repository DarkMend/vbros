import "react-loading-skeleton/dist/skeleton.css";
import styles from "./TaskItem.module.scss";
import cn from "classnames";
import { useDraggable } from "@dnd-kit/core";
import { useSibebarStore } from "../../../store/sidebar.store";
import NoteSidebar from "../../NoteSidebar/NoteSidebar";
import { Pencil } from "lucide-react";
import MenuIcon from "../../../../public/icons/menu-select.svg";
import { useNoteStore } from "../../../store/noteStore";
import { PointerEventHandler } from "react";
import { ITask } from "../../../interfaces/task";

export interface ITaskItem {
  task: ITask;
}

export default function TaskItem({ task }: ITaskItem) {
  const { openSidebar } = useSibebarStore();
  const { allStatuses, setStatus, setDate } = useNoteStore();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: task,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    cursor: transform ? "grab" : "default",
    zIndex: transform && 3,
  };

  // const handleOpenSidebar: PointerEventHandler<HTMLButtonElement> = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const status = allStatuses?.find((status) => status.id === task.status_id);
  //   if (status) {
  //     setStatus(status);
  //   }
  //   setDate(note.date);

  //   openSidebar(
  //     <NoteSidebar title="Обновление заметки" icon={<Pencil />} update={note} />
  //   );
  // };

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
        <div className={styles["description"]}>{task.description}</div>
        <button
          onPointerDown={(e) => handleOpenSidebar(e)}
          className={styles.menuButton}
        >
          <MenuIcon />
        </button>
      </div>
    </div>
  );
}
