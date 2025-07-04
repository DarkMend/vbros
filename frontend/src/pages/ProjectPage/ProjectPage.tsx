import { useNavigate, useParams } from "react-router-dom";
import styles from "./ProjectPage.module.scss";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { projectService } from "../../services/project.service";
import { IProject } from "../../interfaces/project.interface";
import ProjectIcon from "../../../public/icons/team-project.svg";
import ShareIcon from "./../../../public/icons/share.svg";
import { IUserWithRole } from "../../interfaces/user.interface";
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
import PageMenu from "../../components/PageMenu/PageMenu";
import ProfileSettingsItem from "../../components/Sidebar/Profile/ProfileSettings/ProfileSettingsItem/ProfileSettingsItem";
import GearIcon from "./../../../public/icons/gear.svg";
import DeleteIcon from "./../../../public/icons/trash.svg";
import CreateOrUpdateProjectModal from "../../components/Modals/ProjectModal/CreateOrUpdateProjectModal/CreateOrUpdateProjectModal";
import DropdownMenuItem from "../../components/DropdownMenuLayout/DropdownMenuItem";
import ModalConfirmation from "../../components/ModalConfirmation/ModalConfirmation";
import {
  useDeleteProjectHook,
  useExitProjectHook,
} from "../../components/Modals/ProjectModal/CreateOrUpdateProjectModal/useDeleteProject";
import { useJoinProject } from "../../utils/hooks/Project/useJoinProject";
import LinkModal from "../../components/Modals/LinkModal/LinkModal";
import { useUserStore } from "../../store/userStore";
import ExitIcon from "./../../../public/icons/exit.svg";
import ProjectUsers from "../../components/ProjectUsers/ProjectUsers";
import { MessageCircleMore } from "lucide-react";
import { useSibebarStore } from "../../store/sidebar.store";
import Chat from "../../components/Chat/Chat";

type ProjectPageParams = {
  id: string;
};

export default function ProjectPage() {
  const { id } = useParams<ProjectPageParams>();
  const projectId = id ? parseInt(id) : NaN;
  const { openModal, closeModal } = useModalStore();
  const {
    allStatuses,
    setAllStatuses,
    setAllUsers,
    setCurrentUser,
    currentUser,
  } = useTaskStore();
  const { user } = useUserStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { openSidebar } = useSibebarStore();

  // invite по ссылке
  const { mutate: joinMutate } = useJoinProject({
    onSuccess() {
      toast.success("Вы успешно вступили в проект");
      navigate(`/projects/${projectId}`);
      queryClient.invalidateQueries({ queryKey: ["getProjects"] });
    },
    onError(data) {
      toast.warning(data.response?.data?.message);
    },
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("join") === "true") {
      joinMutate(projectId);

      // Очищаем параметр из URL
      urlParams.delete("join");
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${urlParams.toString()}`
      );
    }
  }, [joinMutate, projectId]);

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

  const {
    data: statuses,
    isLoading: isStasusesLoading,
    isFetching,
  } = useQuery({
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
    if (data) {
      setAllUsers(data.users);

      setCurrentUser(
        data.users.find(
          (currentUser: IUserWithRole) => currentUser.id === user?.id
        )
      );
    }
  }, [data, setAllUsers, setCurrentUser, user]);

  const visibleUsers = users.slice(0, 3);

  // dnd
  const handleDragEnd = (e: DragEndEvent) => {
    if (!e.over || !e.active.data.current) return;

    const activeTask = e.active.data.current as ITask;
    const newStatusId = e.over.id as number;

    if (activeTask.status_project_id === newStatusId) return;

    if (currentUser?.role !== "creator") {
      if (currentUser?.id !== (activeTask.user as IUserWithRole)?.id) return;
    }

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

  const openModalConfirmatinDeleteStatus = () => {
    openModal(
      <ModalConfirmation
        text="Вы точно хотите удалить проект и все находящиеся задачи в нём?"
        backAction={() => closeModal()}
        id={projectId}
        handleConfirmation={useDeleteProjectHook}
      />
    );
  };

  const openModalConfirmatinExitInProject = () => {
    openModal(
      <ModalConfirmation
        text="Вы точно хотите удалить этот проект у себя?"
        backAction={() => closeModal()}
        id={projectId}
        handleConfirmation={useExitProjectHook}
      />
    );
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
            <button
              className={styles.chat}
              onClick={() =>
                openSidebar(<Chat text={project.name} projectId={projectId} />)
              }
            >
              <MessageCircleMore />
            </button>
            <ProjectUsers
              visibleUsers={visibleUsers}
              users={users}
              projectId={projectId}
            />
            <PageMenu>
              <div className={styles.pageMenu}>
                <DropdownMenuItem>
                  <ProfileSettingsItem
                    icon={<ShareIcon />}
                    name="Поделиться"
                    onClick={() =>
                      openModal(
                        <LinkModal
                          value={`${window.location.origin}/projects/${projectId}?join=true`}
                        />
                      )
                    }
                  />
                </DropdownMenuItem>
                {currentUser?.role === "creator" && (
                  <DropdownMenuItem>
                    <ProfileSettingsItem
                      icon={<GearIcon />}
                      name="Изменить проект"
                      onClick={() =>
                        openModal(
                          <CreateOrUpdateProjectModal update={data.project} />
                        )
                      }
                    />
                  </DropdownMenuItem>
                )}
                <div className={styles.line}></div>
                {currentUser?.role === "creator" ? (
                  <DropdownMenuItem>
                    <ProfileSettingsItem
                      icon={<DeleteIcon />}
                      name="Удалить проект"
                      deleteButton={true}
                      onClick={openModalConfirmatinDeleteStatus}
                    />
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem>
                    <ProfileSettingsItem
                      icon={<ExitIcon />}
                      name="Выйти из проекта"
                      deleteButton={true}
                      onClick={openModalConfirmatinExitInProject}
                    />
                  </DropdownMenuItem>
                )}
              </div>
            </PageMenu>
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
          {isLoading || isStasusesLoading || isFetching ? (
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

              {currentUser?.role === "creator" && (
                <AddNoteItem
                  typeButton="status"
                  onClick={() =>
                    openModal(
                      <CreateOrUpdateStatusModal statusProjectId={projectId} />
                    )
                  }
                />
              )}
            </>
          )}
        </NotesWrapper>
      </DndContext>
    </div>
  );
}
