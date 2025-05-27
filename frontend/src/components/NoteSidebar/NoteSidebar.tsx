import styles from "./NoteSidebar.module.scss";
import BackIcon from "../../../public/icons/back.svg";
import NoteInfo from "./NoteInfo/NoteInfo";
import CalendarIcon from "../../../public/icons/calendar.svg";
import ModalButton from "../ModalButton/ModalButton";
import { useSibebarStore } from "../../store/sidebar.store";
import { useModalStore } from "../../store/modalStore";
import ChangeNoteStatusModal from "../Modals/ChangeNoteStatusModal/ChangeNoteStatusModal";
import { ReactNode, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNoteStore } from "../../store/noteStore";
import DateModal from "../Modals/DateModal/DateModal";
import { useCreateNote } from "../../utils/hooks/Note/useCreateNote";
import { useForm } from "react-hook-form";
import { INote } from "../../interfaces/note.interface";
import { toast } from "react-toastify";
import { useUpdateNote } from "../../utils/hooks/Note/useUpdateNote";
import ModalConfirmation from "../ModalConfirmation/ModalConfirmation";
import { useDeleteNoteHook, useDeleteTaskHook } from "./useDeleteNote";
import { useTaskStore } from "../../store/taskStore";
import SelectUser from "../Select/SelectUser";
import Title from "../Title/Title";
import { useCreateTask } from "../../utils/hooks/Task/useCreateTask";
import { IStatusProject } from "../../interfaces/statusProject";
import { ITask } from "../../interfaces/task";
import { useUpdateTask } from "../../utils/hooks/Task/useUpdateTask";
import { IUserWithRole } from "../../interfaces/user.interface";
import SelectButton from "../Select/SelectButton";

export interface INoteSidebar {
  title: string;
  icon: ReactNode;
  update?: INote;
  isStatusProject?: boolean;
  updateTask?: ITask;
}

export default function NoteSidebar({
  title,
  icon,
  update,
  isStatusProject,
  updateTask,
}: INoteSidebar) {
  const { closeSidebar } = useSibebarStore();
  const { openModal, closeModal } = useModalStore();
  const { allUsers, setUser, user, currentUser } = useTaskStore();
  const noteStore = useNoteStore();
  const taskStore = useTaskStore();

  const { status, date, allStatuses } = isStatusProject
    ? {
        status: taskStore.status,
        date: taskStore.date,
        allStatuses: taskStore.allStatuses,
      }
    : {
        status: noteStore.status,
        date: noteStore.date,
        allStatuses: noteStore.allStatuses,
      };

  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<INote>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (!update && !updateTask) {
      reset({
        description: "",
      });
    } else {
      reset({
        description: update?.description ?? updateTask?.description,
      });
    }
  }, [reset, update, updateTask]);

  // create note
  const { mutate: createMutate, isPending: createPending } = useCreateNote({
    onError(data) {
      toast.error(data.response?.data?.message);
    },
    onSuccess() {
      toast.success("Заметка успешно создана");
      queryClient.invalidateQueries({ queryKey: ["statuses"] });
      reset();
      closeSidebar();
    },
  });

  // create task

  const { mutate: createTask, isPending: createTaskPending } = useCreateTask({
    onError(data) {
      toast.error(data.response?.data?.message);
    },
    onSuccess() {
      toast.success("Задача успешно создана");
      queryClient.invalidateQueries({
        queryKey: ["projectStatuses", (status as IStatusProject)?.project_id],
      });
      reset();
      closeSidebar();
    },
  });

  // update note

  const { mutate: updateMutate, isPending: updatePending } = useUpdateNote({
    onError(data) {
      toast.error(data.response?.data?.message);
    },
    onSuccess() {
      toast.success("Заметка успешно обновлена");
      queryClient.invalidateQueries({ queryKey: ["statuses"] });
    },
  });

  // update task

  const { mutate: updateTaskMutate, isPending: updateTaskPending } =
    useUpdateTask({
      onError(data) {
        toast.error(data.response?.data?.message);
      },
      onSuccess() {
        toast.success("Задача успешно обновлена");
        queryClient.invalidateQueries({
          queryKey: ["projectStatuses", updateTask?.project_id],
        });
      },
    });

  // delete note

  const deleteHandle = () => {
    if (update) {
      openModal(
        <ModalConfirmation
          text="Вы точно хотите удалить заметку"
          backAction={closeModal}
          id={update.id}
          handleConfirmation={useDeleteNoteHook}
        />
      );
    } else if (updateTask) {
      openModal(
        <ModalConfirmation
          text="Вы точно хотите удалить задачу"
          backAction={closeModal}
          id={updateTask.id}
          handleConfirmation={useDeleteTaskHook}
        />
      );
    }
  };

  const createNote = (data: INote) => {
    if (!status) {
      return toast.error("Выберите статус");
    }

    if (!date) {
      return toast.error("Выберите дату");
    }

    if (update) {
      updateMutate({
        ...data,
        status_id: status.id,
        date: date,
        id: update.id,
      });
    } else if (updateTask) {
      updateTaskMutate({
        ...data,
        status_project_id: status.id,
        completion_time: date,
        user: user?.id as number,
        id: updateTask.id,
      });
    } else {
      if (isStatusProject) {
        createTask({
          ...data,
          status_project_id: status?.id,
          completion_time: date,
          project_id: (status as IStatusProject)?.project_id,
          user: user?.id as number,
        });
      } else {
        createMutate({ ...data, status_id: status?.id, date: date });
      }
    }
  };

  useEffect(() => {
    if (errors.description) toast.error(errors.description.message);
  }, [errors.description]);

  const showDeleteButton =
    (update || updateTask) &&
    (!updateTask ||
      (updateTask &&
        (currentUser?.id === (updateTask.user as IUserWithRole).id ||
          currentUser?.role === "creator")));

  const canChangeStatus =
    !updateTask ||
    (updateTask &&
      (currentUser?.id === (updateTask.user as IUserWithRole).id ||
        currentUser?.role === "creator"));

  const isEditable =
    (!isStatusProject && !updateTask) ||
    currentUser?.role === "creator" ||
    (updateTask && currentUser?.id === (updateTask.user as IUserWithRole)?.id);

  return (
    <div className={styles.noteSidebar}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>
            <div>
              <div className={styles.icon}>{icon}</div>
            </div>
            <div className={styles.text}>{title}</div>
          </div>
          {showDeleteButton && (
            <ModalButton
              typeButton="delete"
              textNone={true}
              className={styles.deleteButton}
              onClick={deleteHandle}
            >
              Удалить
            </ModalButton>
          )}
        </div>
        <div className={styles.info}>
          {allStatuses ? (
            <NoteInfo
              text={status ? status?.name : ""}
              color={status?.color}
              onClick={() => {
                if (canChangeStatus) {
                  openModal(
                    <ChangeNoteStatusModal
                      statuses={allStatuses}
                      isStatusProject={isStatusProject}
                    />
                  );
                }
              }}
            />
          ) : (
            "Нету"
          )}
          <NoteInfo
            text={date?.toLocaleDateString()}
            icon={<CalendarIcon />}
            onClick={() => {
              if (canChangeStatus) {
                openModal(<DateModal isStatusProject={isStatusProject} />);
              }
            }}
          />
        </div>
        {isStatusProject && allUsers && (
          <div className={styles.selectUserWrapper}>
            <Title>Выполняет: </Title>
            {currentUser?.role === "creator" ? (
              <SelectUser
                value={user}
                setValue={setUser}
                users={allUsers}
                color={status?.color}
              />
            ) : (
              updateTask && (
                <SelectButton
                  value={updateTask.user as IUserWithRole}
                  color={status?.color as string}
                />
              )
            )}
          </div>
        )}
        <div className={styles.main}>
          <form onSubmit={handleSubmit(createNote)} id="form">
            <textarea
              {...register("description", {
                required: "Введите заметку",
              })}
              className={styles.textarea}
              placeholder="Введите заметку"
              readOnly={!isEditable}
            />
          </form>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.close} onClick={closeSidebar}>
          <div className={styles.closeSvg}>
            <BackIcon />
          </div>
          <div className={styles.closeText}>Назад</div>
        </button>
        {isEditable && (
          <ModalButton
            className={styles.button}
            isLoading={
              createPending ||
              updatePending ||
              createTaskPending ||
              updateTaskPending
            }
            form="form"
            type="submit"
          >
            {update || updateTask ? "Сохранить" : "Создать"}
          </ModalButton>
        )}
      </div>
    </div>
  );
}
