import { CalendarCheck2 } from "lucide-react";
import ModalLayout from "../ModalLayout/ModalLayout";
import styles from "./ModalConfirmation.module.scss";
import ModalButton from "../ModalButton/ModalButton";
import BackIcon from "../../../public/icons/back.svg";
import ParagraphModal from "../ParagraphModal/ParagraphModal";

export interface IModalConfirmation {
  text?: string;
  handleConfirmation: () => any;
  backAction: () => void;
  isPending?: boolean;
  id?: number;
}

export default function ModalConfirmation({
  text,
  handleConfirmation,
  backAction,
  id,
}: IModalConfirmation) {
  const { mutate, isPending } = handleConfirmation();
  return (
    <ModalLayout icon={<CalendarCheck2 />} title="Подтверждение">
      <div className={styles.modalConfrim}>
        <ParagraphModal isBlack={true}>{text}</ParagraphModal>
        <div className={styles.confirmation}>
          <ModalButton icon={<BackIcon />} onClick={backAction}>
            Назад
          </ModalButton>
          <ModalButton
            typeButton="delete"
            onClick={() => mutate(id)}
            isLoading={isPending}
          >
            Удалить
          </ModalButton>
        </div>
      </div>
    </ModalLayout>
  );
}
