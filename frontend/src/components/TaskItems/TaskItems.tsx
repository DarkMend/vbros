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

export interface ITaskItems {
  className?: string;
  data: IStatusProjectWithTasks;
}

export default function TaskItems({ className, data, ...props }: ITaskItems) {
  const [visibleItem, setVisibleItem] = useState(false);
  const { openModal } = useModalStore();
  const { setStatus, setDate } = useTaskStore();
  const { openSidebar } = useSibebarStore();

  const openCreateNoteSidebar = () => {
    setStatus(data);
    setDate(new Date());
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
      //   ref={setNodeRef}
    >
      <div
        className={cn(styles.over, {
          // [styles.active]: isOver,
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
          <p>{data.name}</p>
        </div>
        <div className={styles["actions"]}>
          <div
            className={cn(styles["actions__item"], styles["eye"])}
            onClick={() => setVisibleItem((state) => !state)}
          >
            {!visibleItem ? <EyeIcon /> : <EyeCloseIcon />}
          </div>
          <button
            className={cn(styles["actions__item"])}
            onClick={() =>
              openModal(<CreateOrUpdateStatusModal statusProject={data} />)
            }
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
        {data.tasks &&
          data.tasks
            .sort(
              (a, b) =>
                new Date(a.updatedAt).getTime() -
                new Date(b.updatedAt).getTime()
            )
            .map((el) => <TaskItem key={el.id} task={el} />)}
        <AddNoteItem typeButton="note" onClick={openCreateNoteSidebar} />
      </div>
    </div>
  );
}
