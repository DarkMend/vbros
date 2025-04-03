import { useQuery } from "@tanstack/react-query";
import ActionButton from "../../components/ActionButton/ActionButton";
import NotesItems from "../../components/NotesItems/NotesItems";
import Title from "../../components/Title/Title";
import styles from "./NotesPage.module.scss";
import AddNoteItem from "../../components/NotesItems/AddNoteItem/AddNoteItem";
import { statusService } from "../../services/status.service";
import { useModalStore } from "../../store/modalStore";
import CreateStatusModal from "../../components/Modals/StatusModals/CreateStatusModal/CreateStatusModal";

export default function NotesPage() {
  const { openModal } = useModalStore();

  const { data, isLoading, isPending } = useQuery({
    queryKey: ["statuses"],
    queryFn: () => statusService.getPersonalStatuses(),
    select: (data) => data.data.data,
  });

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
            {data?.map((status) => (
              <NotesItems
                key={status.id}
                name={status.name}
                iconColor={status.color}
                notes={status.notes}
              />
            ))}

            <AddNoteItem
              typeButton="status"
              onClick={() => openModal(<CreateStatusModal />)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
