import { ArrowDownToLine, X } from "lucide-react";
import styles from "./ImageModal.module.scss";
import { useModalStore } from "../../../store/modalStore";
import { IMessage } from "../../../interfaces/message.interface";
import { axiosWithAuth } from "../../../api/interceptors";

export interface IImageModal {
  message: IMessage;
}

export default function ImageModal({ message }: IImageModal) {
  const { closeModal } = useModalStore();

  const downloadFile = () => {
    axiosWithAuth({
      url: message.fileDownloadUrl as string,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", message.fileName as string);
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <div className={styles.image}>
      <div className={styles.actions}>
        <button className={styles.button} onClick={downloadFile}>
          <ArrowDownToLine />
        </button>
        <button className={styles.button} onClick={closeModal}>
          <X />
        </button>
      </div>
      <img src={message.file as string} />
    </div>
  );
}
