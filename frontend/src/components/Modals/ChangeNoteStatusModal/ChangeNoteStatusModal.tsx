import { Pencil } from "lucide-react";
import ModalLayout from "../../ModalLayout/ModalLayout";
import ParagraphModal from "../../ParagraphModal/ParagraphModal";
import styles from "./ChangeNoteStatusModal.module.scss";
import { IStatus } from "../../../interfaces/status.interface";
import Select from "../../Select/Select";
import { useNoteStore } from "../../../store/noteStore";
import { IStatusProject } from "../../../interfaces/statusProject";
import { useTaskStore } from "../../../store/taskStore";

export interface IChangeNoteStatusModal {
  statuses?: IStatus[] | IStatusProject[];
  isStatusProject?: boolean;
}

export default function ChangeNoteStatusModal({
  statuses,
  isStatusProject,
}: IChangeNoteStatusModal) {
  const { status, setStatus } = useNoteStore();
  const { status: statusProject, setStatus: setStatusProject } = useTaskStore();

  const setStatusValue = (newStatus: IStatus | IStatusProject) => {
    return isStatusProject
      ? setStatusProject(newStatus as IStatusProject)
      : setStatus(newStatus as IStatus);
  };

  return (
    <ModalLayout
      title={isStatusProject ? "Статус задачи" : "Статус заметки"}
      icon={<Pencil />}
    >
      <div className={styles.statuses}>
        <ParagraphModal>
          При выборе другого статус-блока, ваша
          {isStatusProject ? " задача" : " заметка"} будет перенесена на
          соответствующий статус-блок
        </ParagraphModal>
        <Select
          statuses={statuses}
          value={isStatusProject ? statusProject : status}
          setValue={setStatusValue}
        />
      </div>
    </ModalLayout>
  );
}
