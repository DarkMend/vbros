import styles from "./Chat.module.scss";
import { useSibebarStore } from "../../store/sidebar.store";
import { MessageCircleMore, Paperclip, SendHorizonal, X } from "lucide-react";
import FileLoader from "./FileLoader/FileLoader";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IMessage } from "../../interfaces/message.interface";
import { useQuery } from "@tanstack/react-query";
import { messageService } from "../../services/message.service";
import MessageItem from "./MessageItem/MessageItem";
import SkeletonItem from "../SkeletonItem/SkeletonItem";
import { useForm } from "react-hook-form";
import { useCreateMessage } from "../../utils/hooks/Message/useCreateMessage";
import { echo } from "./../../utils/echo";
import { useUserStore } from "../../store/userStore";
import cn from "classnames";

export interface IChat {
  text: string;
  projectId: number;
}

export type UploadedFile = {
  id: string;
  file: File;
  preview?: string;
};

export default function Chat({ text, projectId }: IChat) {
  const { closeSidebar } = useSibebarStore();
  const [file, setFile] = useState<UploadedFile | null>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const { user } = useUserStore();

  const [messages, setMessages] = useState<IMessage[]>([]);

  const { register, handleSubmit, reset } = useForm<IMessage>();

  const { data, isLoading } = useQuery({
    queryKey: ["messages", projectId],
    queryFn: () => messageService.getMessages(projectId),
    select: (data) => data.data.data,
  });

  useEffect(() => {
    if (data) {
      setMessages(data);
      requestAnimationFrame(() => {
        if (isFirstRender.current) {
          scrollToBottom(false);
          isFirstRender.current = false;
        }
      });
    }
  }, [data]);

  // websockets
  useEffect(() => {
    if (!echo) {
      console.error("Echo не инициализирован");
      return;
    }

    echo
      .channel(`project.${projectId}`)
      .listen("NewProjectMessage", (data: { message: IMessage }) => {
        setMessages((prev) => [...prev, data.message]);
      });

    return () => {
      echo.channel(`project.${projectId}`).stopListening("NewProjectMessage");
    };
  }, [projectId]);

  // upload image
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

  // отправка сообщения

  const { mutate } = useCreateMessage({
    onSuccess() {
      reset();
    },
  });

  const onSubmit = (data: IMessage) => {
    const formData = new FormData();
    if (data.message) formData.append("message", data.message);

    formData.append("id", projectId.toString());

    mutate(formData);
  };

  // дата над сообщением

  const shouldShowDate = (index: number) => {
    if (index === 0) return true;

    const currentDate = new Date(messages[index].createdAt).toDateString();
    const prevDate = new Date(messages[index - 1].createdAt).toDateString();

    return currentDate !== prevDate;
  };

  // прокрутка сообщения

  const scrollToBottom = (withAnimation: boolean = true) => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: withAnimation ? "smooth" : "auto",
      });
    }
  };

  useEffect(() => {
    if (!isFirstRender.current) scrollToBottom();
  }, [messages]);

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
          <button className={styles.close} onClick={closeSidebar}>
            <X />
          </button>
        </div>
        <div className={styles.chatWrapper}>
          <div className={styles.chat} ref={chatContainerRef}>
            {isLoading ? (
              <div className={styles.skeletonWrapper}>
                <SkeletonItem
                  className={styles.skeleton}
                  classNameContainer={styles.skeleton}
                />
                <SkeletonItem
                  className={styles.skeleton}
                  classNameContainer={styles.skeleton}
                />
                <SkeletonItem
                  className={styles.skeleton}
                  classNameContainer={styles.skeleton}
                />
                <SkeletonItem
                  className={styles.skeleton}
                  classNameContainer={styles.skeleton}
                />
              </div>
            ) : (
              messages.map((message, index) => (
                <MessageItem
                  key={message.id}
                  message={message}
                  isMyMessage={message.user.id === user?.id}
                  showDate={shouldShowDate(index)}
                />
              ))
            )}
          </div>
          <div className={styles.chatTextarea}>
            <div
              className={cn(styles.fileLoader, {
                [styles.fileType]: !file?.file.type.startsWith("image/"),
                [styles.active]: file,
              })}
            >
              <FileLoader file={file} onRemove={handleRemoveFile} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.formWrapper}>
                <textarea
                  placeholder="Введите сообщение"
                  onInput={(e) => {
                    e.currentTarget.style.height = "auto";
                    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                  }}
                  {...register("message", {
                    required: "Введите название",
                  })}
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
            </form>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        {/* <button className={styles.close} onClick={closeSidebar}>
          <div className={styles.closeSvg}>
            <BackIcon />
          </div>
          <div className={styles.closeText}>Назад</div>
        </button> */}
      </div>
    </div>
  );
}
