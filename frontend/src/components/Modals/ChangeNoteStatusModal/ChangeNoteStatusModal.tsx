import { Pencil } from "lucide-react";
import ModalLayout from "../../ModalLayout/ModalLayout";
import ParagraphModal from "../../ParagraphModal/ParagraphModal";
import SeparationLine from "../../SeparationLine/SeparationLine";
import styles from "./ChangeNoteStatusModal.module.scss";
import { IStatus } from "../../../interfaces/status.interface";
import ModalMenuItem from "../../ModalMenuItem/ModalMenuItem";
import Select from "../../Select/Select";

export interface IChangeNoteStatusModal {
  statuses?: IStatus[];
}

export default function ChangeNoteStatusModal({
  statuses,
}: IChangeNoteStatusModal) {
  return (
    <ModalLayout title="Статус заметки" icon={<Pencil />}>
      <div className={styles.statuses}>
        <ParagraphModal>
          При выборе другого статус-блока, ваша заметка будет перенесена на
          соответствующий статус-блок
        </ParagraphModal>
        <Select></Select>
      </div>
    </ModalLayout>
  );
}
