import { ArrowDownToLine, Eye, FileIcon } from "lucide-react";
import styles from "./FileMessage.module.scss";
import { IMessage } from "../../../interfaces/message.interface";
import { axiosWithAuth } from "../../../api/interceptors";
import { useModalStore } from "../../../store/modalStore";
import ImageModal from "../../Modals/ImageModal/ImageModal";

export interface IFileMessage {
  file: string;
  fileName: string;
  message: IMessage;
}

export default function FileMessage({ file, fileName, message }: IFileMessage) {
  const isImage =
    fileName.endsWith(".jpg") ||
    fileName.endsWith(".jpg") ||
    fileName.endsWith(".jpg");
  const { openModal } = useModalStore();

  const downloadFile = () => {
    axiosWithAuth({
      url: message.fileDownloadUrl as string,
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", message.fileName as string);
      document.body.appendChild(link);
      link.click();
    });
  };
  return isImage ? (
    <button
      className={styles.file}
      onClick={() => openModal(<ImageModal message={message} />)}
    >
      <div className={styles.image}>
        <div className={styles.hoverIcon}>
          <Eye />
        </div>
        <img src={file} alt="" />
      </div>
      <div className={styles.text}>{fileName}</div>
    </button>
  ) : (
    <a onClick={downloadFile} className={styles.file} download>
      <div className={styles.icon}>
        <div className={styles.hoverIcon}>
          <ArrowDownToLine />
        </div>
        <FileIcon />
      </div>
      <div className={styles.text}>{fileName}</div>
    </a>
  );
}
