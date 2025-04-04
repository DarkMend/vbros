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

export default function NotesPage() {
  const { openModal } = useModalStore();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["statuses"],
    queryFn: () => statusService.getPersonalStatuses(),
    select: (data) => data.data.data,
  });

  const isLoadingStatus = isLoading || isFetching;

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
      </div>
    </>
  );
}
