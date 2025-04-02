import { Pencil } from "lucide-react";
import ModalLayout from "../../ModalLayout/ModalLayout";
import ParagraphModal from "../../ParagraphModal/ParagraphModal";
import SeparationLine from "../../SeparationLine/SeparationLine";
import styles from "./ChangeNoteStatusModal.module.scss";

export default function ChangeNoteStatusModal() {
  return (
    <ModalLayout title="Статус заметки" icon={<Pencil />}>
      <div className={styles.statuses}>
        <ParagraphModal>
          При выборе другого статус-блока, ваша заметка будет перенесена на
          соответствующий статус-блок
        </ParagraphModal>
        <SeparationLine />
      </div>
    </ModalLayout>
  );
}
