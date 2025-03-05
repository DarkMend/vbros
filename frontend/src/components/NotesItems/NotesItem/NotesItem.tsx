import "react-loading-skeleton/dist/skeleton.css";
import styles from "./NotesItem.module.scss";
import cn from "classnames";
import { useDraggable } from "@dnd-kit/core";
import { INotesItem } from "./NotesItem.props";

export default function NotesItem({ note }: INotesItem) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: note.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    cursor: "grab",
  };

  return (
    <>
      <div
        className={cn(styles["notes-item"])}
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        <div className={styles["title"]}>{note.title}</div>
        <div className={styles["description"]}>{note.description}</div>
        <div className={styles["deadline"]}>
          {new Date(note.created_at).toLocaleDateString()}
        </div>
      </div>
    </>
  );
}
