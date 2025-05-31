import { ArrowDownToLine, Eye, FileIcon } from "lucide-react";
import styles from "./FileMessage.module.scss";
import { IMessage } from "../../../interfaces/message.interface";

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

  return isImage ? (
    <button className={styles.file}>
      <div className={styles.image}>
        <div className={styles.hoverIcon}>
          <Eye />
        </div>
        <img src={file} alt="" />
      </div>
      <div className={styles.text}>{fileName}</div>
    </button>
  ) : (
    <a href={file} className={styles.file} target="_blank">
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
