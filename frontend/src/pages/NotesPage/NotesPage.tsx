import { useQuery } from "@tanstack/react-query";
import ActionButton from "../../components/ActionButton/ActionButton";
import NotesItems from "../../components/NotesItems/NotesItems";
import Title from "../../components/Title/Title";
import styles from "./NotesPage.module.scss";
import AddNoteItem from "../../components/NotesItems/AddNoteItem/AddNoteItem";
import { statusService } from "../../services/status.service";

export default function NotesPage() {
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["statuses"],
    queryFn: () => statusService.getStatuses(),
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
                name={status.name}
                iconColor="#FF9D00"
                notes={status.notes}
              />
            ))}

            <AddNoteItem typeButton="status" />
          </div>
        </div>
      </div>
    </>
  );
}
