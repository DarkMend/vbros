import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./NotesItem.module.scss";
import { useDrag } from "react-dnd";
import cn from "classnames";
import { useState } from "react";

export default function NotesItem({ data, ...props }: { data: Object }) {
  const [{ isDragStart }, dragRef] = useDrag({
    type: "item",
    item: data,
    collect: (monitor) => ({
      isDragStart: monitor.isDragging(),
    }),
  });

  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = () => {
    setIsMouseDown(true);
    console.log('s')
  }

  const handleMouseUp = () => {
    setIsMouseDown(false);
    console.log('a')

  }

  return (
    <>
      <div
        className={cn(styles["notes-item"], {
          [styles["isDragging"]]: isDragStart,
          [styles['preview']]: isMouseDown
        })}
        ref={dragRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
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
