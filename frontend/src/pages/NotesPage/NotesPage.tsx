import { useQuery, useQueryClient } from "@tanstack/react-query";
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

export default function NotesPage() {
  const { openModal } = useModalStore();
  const { setAllStatuses } = useNoteStore();
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["statuses"],
    queryFn: () => statusService.getPersonalStatuses(),
    select: (data) => data.data.data,
  });

  const { mutate, isPending } = useChangeStautsNote({
    onError(data) {
      toast.error(data.response?.data?.message);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["statuses"] });
    },
  });

  useEffect(() => {
    if (data) setAllStatuses(data);
  }, [data, setAllStatuses]);

  const isLoadingStatus = isLoading || isFetching || isPending;

  const handleDragEnd = (e: DragEndEvent) => {
    if (e.over?.id === e.active.data.current?.status_id) {
      return;
    }
    mutate({ id: e.active.id as number, status_id: e.over?.id as number });
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
          <div className={styles["notes__wrapper"]}>
            <div className={styles["notes__wrapper-status"]}>
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
                  {data?.map((status) => (
                    <NotesItems key={status.id} data={status} />
                  ))}
                  <AddNoteItem
                    typeButton="status"
                    onClick={() => openModal(<CreateOrUpdateStatusModal />)}
                  />
                </>
              )}
            </div>
          </div>
        </DndContext>
      </div>
    </>
  );
}
