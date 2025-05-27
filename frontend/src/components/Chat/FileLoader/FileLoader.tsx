import { UploadedFile } from "../Chat";
import styles from "./FileLoader.module.scss";
import { CircleX, FileIcon } from "lucide-react";

export interface IFileLoader {
  file?: UploadedFile | null;
  onRemove?: () => void;
}

export default function FileLoader({ file, onRemove }: IFileLoader) {
  if (!file) return null;

  const isImage = file.file.type.startsWith("image/");

  return (
    <div className={styles.fileLoader}>
      <button onClick={onRemove} className={styles.remove}>
        <CircleX />
      </button>
      <div>
        {isImage ? (
          <div className={styles.img}>
            <img src={file.preview} alt={file.preview} />
          </div>
        ) : (
          <div className={styles.file}>
            <div className={styles.fileIcon}>{<FileIcon />}</div>
            <div className={styles.fileText}>
              <p className={styles.text}>{file.preview}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
