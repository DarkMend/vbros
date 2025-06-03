import styles from "./TaskItems.module.scss";
import cn from "classnames";
import FileIcon from "../../../public/icons/file-outline.svg";
import ColorSquare from "../ColorSquare/ColorSquare";
import { useState } from "react";
import MenuSelectIcon from "../../../public/icons/menu-select.svg";
import AddNoteItem from "../NotesItems/AddNoteItem/AddNoteItem";
import TaskItem from "./TaskItem/TaskItem";
import { IStatusProjectWithTasks } from "../../interfaces/statusProject";
import EyeIcon from "./../../../public/icons/eye.svg";
import EyeCloseIcon from "./../../../public/icons/close-eye.svg";
import CreateOrUpdateStatusModal from "../Modals/StatusModals/CreateOrUpdateStatusModal/CreateOrUpdateStatusModal";
import { useModalStore } from "../../store/modalStore";
import { useTaskStore } from "../../store/taskStore";
import NoteSidebar from "../NoteSidebar/NoteSidebar";
import { useSibebarStore } from "../../store/sidebar.store";
import { useDroppable } from "@dnd-kit/core";

export interface ITaskItems {
  className?: string;
  data: IStatusProjectWithTasks;
}

export default function TaskItems({ className, data, ...props }: ITaskItems) {
  const [visibleItem, setVisibleItem] = useState(false);
  const { openModal } = useModalStore();
  const { setStatus, setDate, setUser, allUsers, currentUser } = useTaskStore();
  const { openSidebar } = useSibebarStore();
  const { setNodeRef, isOver } = useDroppable({
    id: data.id,
  });

  const openCreateNoteSidebar = () => {
    setStatus(data);
    setDate(new Date());

    if (allUsers) {
      setUser(allUsers[0]);
    }
    openSidebar(
      <NoteSidebar
        title="Создать задачу"
        icon={<FileIcon />}
        isStatusProject={true}
      />
    );
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
            {!visibleItem ? <EyeIcon /> : <EyeCloseIcon />}
          </div>
          {currentUser?.role === "creator" && (
            <button
              className={cn(styles["actions__item"])}
              onClick={() =>
                openModal(<CreateOrUpdateStatusModal statusProject={data} />)
              }
            >
              <MenuSelectIcon />
            </button>
          )}
        </div>
      </div>
      <div
        className={cn(styles["notes-items__wrapper"], {
          [styles["visible-items"]]: visibleItem,
        })}
      >
        {data.tasks &&
          data.tasks
            .sort(
              (a, b) =>
                new Date(a.updated_at).getTime() -
                new Date(b.updated_at).getTime()
            )
            .map((el) => <TaskItem key={el.id} task={el} />)}
        {currentUser?.role === "creator" && (
          <AddNoteItem typeButton="note" onClick={openCreateNoteSidebar} />
        )}
      </div>
    </div>
  );
}
