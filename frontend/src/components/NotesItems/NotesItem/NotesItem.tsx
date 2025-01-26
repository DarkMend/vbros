import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./NotesItem.module.scss";
import cn from "classnames";

export default function NotesItem({ data, ...props }: { data: Object }) {
  


  return (
    <>
      <div
        className={cn(styles["notes-item"], {
        })}
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
