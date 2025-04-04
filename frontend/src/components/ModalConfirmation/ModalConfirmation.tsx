import { CalendarCheck2 } from "lucide-react";
import ModalLayout from "../ModalLayout/ModalLayout";
import styles from "./ModalConfirmation.module.scss";
import ModalButton from "../ModalButton/ModalButton";
import BackIcon from "../../../public/icons/back.svg";
import ParagraphModal from "../ParagraphModal/ParagraphModal";

export interface IModalConfirmation {
  text: string;
  handleConfirmation: () => void;
  backAction: () => void;
  isPending?: boolean;
}

export default function ModalConfirmation({
  text,
  handleConfirmation,
  backAction,
  isPending,
}: IModalConfirmation) {
  return (
    <ModalLayout icon={<CalendarCheck2 />} title="Подтверждение">
      <div className={styles.modalConfrim}>
        <ParagraphModal isBlack={true}>{text}</ParagraphModal>
        <div>{isPending ? "Pending..." : "great"}</div>
        <div className={styles.confirmation}>
          <ModalButton icon={<BackIcon />} onClick={backAction}>
            Назад
          </ModalButton>
          <ModalButton
            typeButton="delete"
            onClick={handleConfirmation}
            isLoading={isPending}
          >
            Удалить
          </ModalButton>
        </div>
      </div>
    </ModalLayout>
  );
}
