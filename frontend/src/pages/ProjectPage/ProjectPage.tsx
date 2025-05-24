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

type ProjectPageParams = {
  id: string;
};

export default function ProjectPage() {
  const { id } = useParams<ProjectPageParams>();
  const projectId = id ? parseInt(id) : NaN;
  const { openModal } = useModalStore();

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
  });

  const project: IProject = data?.project ?? {};
  const users = data?.users ?? [];
  const visibleUsers = users.slice(0, 3);

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
            {statuses?.map((status: IStatusProjectWithTasks) => (
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
    </div>
  );
}
