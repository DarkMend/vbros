import { FileOutput } from "lucide-react";
import MainInput from "../../MainInput/MainInput";
import ModalLayout from "../../ModalLayout/ModalLayout";
import ShareIcon from "./../../../../public/icons/share.svg";
import styles from "./LinkModal.module.scss";
import cn from "classnames";
import { useState } from "react";

export default function LinkModal({ value }: { value: string }) {
  const [activeText, setActiveText] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(value);
    setActiveText(true);
    setTimeout(() => setActiveText(false), 500);
  };

  return (
    <ModalLayout icon={<ShareIcon />} title="Ссылка на проект">
      <div className={styles.wrapper}>
        <MainInput
          readOnly
          value={value}
          style={{ fontSize: "14px", width: "100%" }}
        />
        <div className={styles.button} onClick={copyText}>
          <div
            className={cn(styles.show, {
              [styles.active]: activeText,
            })}
          >
            Скопировано!
          </div>
          <div className={styles.icon}>
            <FileOutput />
          </div>
        </div>
      </div>
    </ModalLayout>
  );
}
