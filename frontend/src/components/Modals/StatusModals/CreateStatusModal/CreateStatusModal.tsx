import { ClipboardPlus, Palette } from "lucide-react";
import ModalLayout from "../../../ModalLayout/ModalLayout";
import styles from "./CreateStatusModal.module.scss";
import ParagraphModal from "../../../ParagraphModal/ParagraphModal";
import ModalMenuItem from "../../../ModalMenuItem/ModalMenuItem";
import { useState } from "react";

export default function CreateStatusModal() {
  const [color, setColor] = useState("#FF9D00");

  return (
    <ModalLayout icon={<ClipboardPlus />} title="Добавить статус блок">
      <div className={styles.status}>
        <ParagraphModal>
          Здесь вы сможете создать свой статус блок.
        </ParagraphModal>
        <ParagraphModal>
          Для изменения цвета нажмите на квадратик с цветом
        </ParagraphModal>
        <ModalMenuItem
          icon={<Palette />}
          name="Выберите цвет"
          nameHover={false}
          overflowHidden={false}
          colorPicker={true}
          color={color}
        />
      </div>
    </ModalLayout>
  );
}
