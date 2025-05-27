import styles from "./Chat.module.scss";
import BackIcon from "../../../public/icons/back.svg";
import { useSibebarStore } from "../../store/sidebar.store";
import { MessageCircleMore, Paperclip, SendHorizonal } from "lucide-react";
import FileLoader from "./FileLoader/FileLoader";
import { ChangeEvent, useRef, useState } from "react";
import AvatarPlug from "../AvatarPlug/AvatarPlug";
import cn from "classnames";

export interface IChat {
  text: string;
}

export type UploadedFile = {
  id: string;
  file: File;
  preview?: string;
};

export default function Chat({ text }: IChat) {
  const { closeSidebar } = useSibebarStore();
  const [file, setFile] = useState<UploadedFile | null>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const newFile: UploadedFile = {
        id: Math.random().toString(36).substring(2, 9),
        file: selectedFile,
        preview: selectedFile.name,
      };

      if (selectedFile.type.startsWith("image/")) {
        newFile.preview = URL.createObjectURL(selectedFile);
      }

      setFile(newFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (file?.preview) {
      URL.revokeObjectURL(file.preview);
    }
  };

  return (
    <div className={styles.noteSidebar}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>
            <div>
              <div className={styles.icon}>
                <MessageCircleMore />
              </div>
            </div>
            <div className={styles.text}>Чат проекта {text}</div>
          </div>
        </div>
        <div className={styles.chatWrapper}>
          <div className={styles.chat}>
            <div className={cn(styles.chatMessageWrapper, styles.myMessage)}>
              <div>
                <div className={styles.ava}>
                  <AvatarPlug name="Ayaz" />
                </div>
              </div>
              <div className={styles.message}>
                <p className={styles.name}>Ayaz</p>
                <p className={styles.text}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                  ad assumenda ea quam officia, voluptates quibusdam soluta in
                  molestiae eos esse deserunt, placeat culpa cupiditate expedita
                  nobis. Quas, et facere.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.chatTextarea}>
            <form action="">
              <div className={styles.formWrapper}>
                <textarea
                  placeholder="Введите сообщение"
                  onInput={(e) => {
                    e.currentTarget.style.height = "auto";
                    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                  }}
                ></textarea>
                <div className={styles.chartActions}>
                  <label htmlFor="file" className={styles.chartAction}>
                    <Paperclip />
                  </label>
                  <input
                    type="file"
                    hidden
                    id="file"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                  <button className={styles.chartAction} type="submit">
                    <SendHorizonal />
                  </button>
                </div>
              </div>
              {file && (
                <div className={styles.fileLoader}>
                  <FileLoader file={file} onRemove={handleRemoveFile} />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.close} onClick={closeSidebar}>
          <div className={styles.closeSvg}>
            <BackIcon />
          </div>
          <div className={styles.closeText}>Назад</div>
        </button>
      </div>
    </div>
  );
}
