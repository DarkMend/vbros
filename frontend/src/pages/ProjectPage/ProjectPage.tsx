import { useParams } from "react-router-dom";
import styles from "./ProjectPage.module.scss";
import { useQuery } from "@tanstack/react-query";
import { projectService } from "../../services/project.service";
import { IProject } from "../../interfaces/project.interface";
import ProjectIcon from "../../../public/icons/team-project.svg";
import MenuSelect from "../../../public/icons/menu-select.svg";
import { IUserWithRole } from "../../interfaces/user.interface";
import AvatarPlug from "../../components/AvatarPlug/AvatarPlug";
import SkeletonItem from "../../components/SkeletonItem/SkeletonItem";
import Title from "../../components/Title/Title";
import NotesWrapper from "../../components/NotesWrapper/NotesWrapper";
import TaskItems from "../../components/TaskItems/TaskItems";
import { IStatusProjectWithTasks } from "../../interfaces/statusProject";
import AddNoteItem from "../../components/NotesItems/AddNoteItem/AddNoteItem";
import CreateOrUpdateStatusModal from "../../components/Modals/StatusModals/CreateOrUpdateStatusModal/CreateOrUpdateStatusModal";
import { useModalStore } from "../../store/modalStore";
import { useTaskStore } from "../../store/taskStore";
import { useEffect } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { ITask } from "../../interfaces/task";
import { useChangeStatusTask } from "../../utils/hooks/Task/useChangeStatusTask";
import { toast } from "react-toastify";

type ProjectPageParams = {
  id: string;
};

export default function ProjectPage() {
  const { id } = useParams<ProjectPageParams>();
  const projectId = id ? parseInt(id) : NaN;
  const { openModal } = useModalStore();
  const { allStatuses, setAllStatuses, setAllUsers } = useTaskStore();

  const { mutate } = useChangeStatusTask();

  const { data, isLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => {
      if (isNaN(projectId)) {
        throw new Error("Invalid project ID");
      }

      return projectService.getProject(projectId);
    },
    select: (data) => data.data.data,
  });

  const { data: statuses, isLoading: isStasusesLoading } = useQuery({
    queryKey: ["projectStatuses", projectId],
    queryFn: () => {
      if (isNaN(projectId)) {
        throw new Error("Invalid project ID");
      }

      return projectService.getStatuses(projectId);
    },
    select: (statuses) => statuses.data.data,
    refetchInterval: 20000,
  });

  useEffect(() => {
    if (statuses) setAllStatuses(statuses);
  }, [statuses, setAllStatuses]);

  const project: IProject = data?.project ?? {};
  const users = data?.users ?? [];

  useEffect(() => {
    if (data) setAllUsers(data.users);
  }, [data, setAllUsers]);

  const visibleUsers = users.slice(0, 3);

  // dnd
  const handleDragEnd = (e: DragEndEvent) => {
    if (!e.over || !e.active.data.current) return;

    const activeTask = e.active.data.current as ITask;
    const newStatusId = e.over.id as number;

    if (activeTask.status_project_id === newStatusId) return;

    if (e.over?.id === e.active.data.current?.status_id) {
      return;
    }

    const arr = allStatuses?.map((status) => {
      if (status.id === newStatusId) {
        return {
          ...status,
          tasks: [
            ...status.tasks,
            {
              ...activeTask,
              status_project_id: newStatusId,
              updated_at: new Date(),
            },
          ],
        };
      }

      if (status.id == activeTask.status_project_id) {
        return {
          ...status,
          tasks: status.tasks.filter((task) => task.id !== activeTask.id),
        };
      }

      return status;
    });

    if (arr) setAllStatuses(arr);

    if (arr) {
      mutate(
        { id: activeTask.id, status_project_id: newStatusId },
        {
          onError(message) {
            toast.error(message.response?.data?.message);
            if (statuses) setAllStatuses(statuses);
          },
        }
      );
    }
  };

  return (
    <div className={styles.project}>
      {isLoading ? (
        <SkeletonItem
          className={styles.headerSkeleton}
          classNameContainer={styles.headerSkeletonContainer}
        />
      ) : (
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <div className={styles.img}>
              {project?.icon ? (
                <img src={project?.icon as string} alt={project.name} />
              ) : (
                <ProjectIcon />
              )}
            </div>
            <div className={styles.text}>{project.name}</div>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.usersProject}>
              {visibleUsers?.map((user: IUserWithRole, index: number) => (
                <div
                  className={styles.usersProjectAva}
                  key={user.id}
                  style={{
                    zIndex: 2 - index,
                  }}
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt="" />
                  ) : (
                    <AvatarPlug name={user.name} />
                  )}
                </div>
              ))}
              {users.length > 3 && (
                <div className={styles.count}>+{users.length - 2}</div>
              )}
            </div>
            <button className={styles.actions}>
              <MenuSelect />
            </button>
          </div>
        </div>
      )}
      {!isLoading && (
        <>
          <div className={styles.projectDesc}>{project.description}</div>
          <Title>Задачи</Title>
        </>
      )}
      <DndContext onDragEnd={handleDragEnd}>
        <NotesWrapper className={styles.notesWrapper}>
          {isLoading || isStasusesLoading ? (
            <div className={styles.skeletonWrapper}>
              {Array.from({ length: 4 }, (_, index) => (
                <SkeletonItem
                  key={"skeleton-" + index}
                  count={2}
                  className={styles.skeleton}
                  classNameContainer={styles.skeletonContainer}
                />
              ))}
            </div>
          ) : (
            <>
              {allStatuses?.map((status: IStatusProjectWithTasks) => (
                <TaskItems data={status} key={status.id} />
              ))}

              <AddNoteItem
                typeButton="status"
                onClick={() =>
                  openModal(
                    <CreateOrUpdateStatusModal statusProjectId={projectId} />
                  )
                }
              />
            </>
          )}
        </NotesWrapper>
      </DndContext>
    </div>
  );
}
