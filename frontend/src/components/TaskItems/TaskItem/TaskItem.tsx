import "react-loading-skeleton/dist/skeleton.css";
import styles from "./TaskItem.module.scss";
import cn from "classnames";
import { useDraggable } from "@dnd-kit/core";
import { useSibebarStore } from "../../../store/sidebar.store";
import NoteSidebar from "../../NoteSidebar/NoteSidebar";
import { Pencil } from "lucide-react";
import MenuIcon from "../../../../public/icons/menu-select.svg";
import { PointerEventHandler } from "react";
import { ITask } from "../../../interfaces/task";
import { IUserWithRole } from "../../../interfaces/user.interface";
import AvatarPlug from "../../AvatarPlug/AvatarPlug";
import { useTaskStore } from "../../../store/taskStore";

export interface ITaskItem {
  task: ITask;
}

export default function TaskItem({ task }: ITaskItem) {
  const { openSidebar } = useSibebarStore();
  const { allStatuses, setStatus, setDate, setUser, currentUser } =
    useTaskStore();
  const isDraggable =
    (task.user && currentUser?.id === (task.user as IUserWithRole).id) ||
    currentUser?.role === "creator";

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: task,
    disabled: !isDraggable,
  });
  const user = task.user as IUserWithRole;

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    cursor: transform ? "grab" : "default",
    zIndex: transform && 3,
  };

  const handleOpenSidebar: PointerEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const status = allStatuses?.find(
      (status) => status.id === task.status_project_id
    );
    if (status) {
      setStatus(status);
    }
    setDate(new Date(task.completion_time));
    if (typeof task.user !== "number") setUser(task.user);

    openSidebar(
      <NoteSidebar
        title="Обновление задачи"
        icon={<Pencil />}
        updateTask={task}
        isStatusProject={true}
      />
    );
  };

  const isOverdue =
    task?.completion_time && new Date(task.completion_time) < new Date();

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
      <div className={styles.user}>
        {user ? (
          user.avatar ? (
            <img src={user.avatar} />
          ) : (
            <AvatarPlug name={user.name} />
          )
        ) : (
          <AvatarPlug />
        )}
      </div>
      <div
        className={cn(styles.date, {
          [styles.overdue]: isOverdue,
        })}
      >
        Дата выполнения: {new Date(task?.completion_time).toLocaleDateString()}
      </div>
    </div>
  );
}
