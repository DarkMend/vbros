import { useQuery } from "@tanstack/react-query";
import ActionButton from "../../components/ActionButton/ActionButton";
import NotesItems from "../../components/NotesItems/NotesItems";
import Title from "../../components/Title/Title";
import styles from "./NotesPage.module.scss";
import AddNoteItem from "../../components/NotesItems/AddNoteItem/AddNoteItem";
import { statusService } from "../../services/status.service";
import { useModalStore } from "../../store/modalStore";
import CreateOrUpdateStatusModal from "../../components/Modals/StatusModals/CreateOrUpdateStatusModal/CreateOrUpdateStatusModal";
import SkeletonItem from "../../components/SkeletonItem/SkeletonItem";
import { useEffect } from "react";
import { useNoteStore } from "../../store/noteStore";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useChangeStautsNote } from "../../utils/hooks/Note/useChangeStatusNote";
import { toast } from "react-toastify";
import { INote } from "../../interfaces/note.interface";
import NotesWrapper from "../../components/NotesWrapper/NotesWrapper";

export default function NotesPage() {
  const { openModal } = useModalStore();
  const { allStatuses, setAllStatuses } = useNoteStore();

  const { data, isLoading } = useQuery({
    queryKey: ["statuses"],
    queryFn: () => statusService.getPersonalStatuses(),
    select: (data) => data.data.data,
  });

  const { mutate } = useChangeStautsNote();

  useEffect(() => {
    if (data) setAllStatuses(data);
  }, [data, setAllStatuses]);

  const isLoadingStatus = isLoading;

  const handleDragEnd = (e: DragEndEvent) => {
    if (!e.over || !e.active.data.current) return;

    const activeNote = e.active.data.current as INote;
    const newStatusId = e.over.id as number;

    if (activeNote.status_id === newStatusId) return;

    if (e.over?.id === e.active.data.current?.status_id) {
      return;
    }

    const arr = allStatuses?.map((status) => {
      if (status.id === newStatusId) {
        return {
          ...status,
          notes: [
            ...status.notes,
            { ...activeNote, status_id: newStatusId, updated_at: new Date() },
          ],
        };
      }

      if (status.id == activeNote.status_id) {
        return {
          ...status,
          notes: status.notes.filter((note) => note.id !== activeNote.id),
        };
      }

      return status;
    });
    if (arr) setAllStatuses(arr);

    if (arr) {
      mutate(
        { id: activeNote.id, status_id: newStatusId },
        {
          onError(message) {
            toast.error(message.response?.data?.message);
            if (data) setAllStatuses(data);
          },
        }
      );
    }
  };

  return (
    <>
      <div className={styles["notes"]}>
        <div className={styles["head"]}>
          <Title>Заметки</Title>
          <div className={styles["actions"]}>
            <ActionButton>
              <img src="./sqrt.png" alt="" />
            </ActionButton>
          </div>
        </div>
        <DndContext onDragEnd={handleDragEnd}>
          <NotesWrapper>
            {isLoadingStatus ? (
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
                {allStatuses?.map((status) => (
                  <NotesItems key={status.id} data={status} />
                ))}
                <AddNoteItem
                  typeButton="status"
                  onClick={() => openModal(<CreateOrUpdateStatusModal />)}
                />
              </>
            )}
          </NotesWrapper>
        </DndContext>
      </div>
    </>
  );
}
