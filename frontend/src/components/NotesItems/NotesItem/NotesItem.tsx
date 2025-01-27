import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./NotesItem.module.scss";
import cn from "classnames";
import { useDraggable } from "@dnd-kit/core";

export default function NotesItem({ data, ...props }: { data: Object }) {

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: data.id,

  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    cursor: 'grab',
  }

  return (
    <>
      <div
        className={cn(styles["notes-item"])} style={style} ref={ setNodeRef } {...attributes} {...listeners}
      >
        <div className={styles["title"]}>{data.title}</div>
        <div className={styles["description"]}>
          <Skeleton height={17} />
          {data.description}
        </div>
        <div className={styles["deadline"]}>{data.date}</div>
      </div>
    </>
  );
}
