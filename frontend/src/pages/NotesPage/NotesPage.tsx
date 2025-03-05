import { useQuery } from "@tanstack/react-query";
import ActionButton from "../../components/ActionButton/ActionButton";
import NotesItems from "../../components/NotesItems/NotesItems";
import Title from "../../components/Title/Title";
import styles from "./NotesPage.module.scss";
import { noteService } from "../../services/note.service";
import { INote } from "../../interfaces/note.interface";

export default function NotesPage() {
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["notes"],
    queryFn: () => noteService.getNotes(),
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
            <NotesItems
              name="Без статуса"
              iconColor="#FF9D00"
              notes={data?.filter((el: INote) => el.status_id == 1)}
            />
            <NotesItems
              name="Планирование"
              iconColor="#63C3FF"
              className={styles["notes-items"]}
              notes={data?.filter((el: INote) => el.status_id == 2)}
            />
            <NotesItems
              name="Процесс"
              iconColor="#6BFF63"
              className={styles["notes-items"]}
              notes={data?.filter((el: INote) => el.status_id == 3)}
            />
            <NotesItems
              name="Завершение"
              iconColor="#E4E4E4"
              className={styles["notes-items"]}
              notes={data?.filter((el: INote) => el.status_id == 4)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
