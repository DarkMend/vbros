import { Pencil } from "lucide-react";
import ModalLayout from "../../ModalLayout/ModalLayout";
import ParagraphModal from "../../ParagraphModal/ParagraphModal";
import styles from "./ChangeNoteStatusModal.module.scss";
import { IStatus } from "../../../interfaces/status.interface";
import Select from "../../Select/Select";
import { useStatusStore } from "../../../store/statusStore";

export interface IChangeNoteStatusModal {
  statuses?: IStatus[];
}

export default function ChangeNoteStatusModal({
  statuses,
}: IChangeNoteStatusModal) {
  const { status, setStatus } = useStatusStore();

  return (
    <ModalLayout title="Статус заметки" icon={<Pencil />}>
      <div className={styles.statuses}>
        <ParagraphModal>
          При выборе другого статус-блока, ваша заметка будет перенесена на
          соответствующий статус-блок
        </ParagraphModal>
        <Select statuses={statuses} value={status} setValue={setStatus} />
      </div>
    </ModalLayout>
  );
}
