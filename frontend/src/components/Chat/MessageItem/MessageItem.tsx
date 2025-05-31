import AvatarPlug from "../../AvatarPlug/AvatarPlug";
import cn from "classnames";
import styles from "./MessageItem.module.scss";
import { IMessage } from "../../../interfaces/message.interface";
import { format, isToday, isYesterday } from "date-fns";
import { ru } from "date-fns/locale";

export interface IMessageItem {
  message: IMessage;
  isMyMessage?: boolean;
  showDate?: boolean;
}

export default function MessageItem({
  message,
  isMyMessage,
  showDate = false,
}: IMessageItem) {
  const formatMessageDate = (dateInput: Date | string) => {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    if (isNaN(date.getTime())) {
      console.error("Invalid date:", dateInput);
      return "";
    }

    if (isToday(date)) {
      return "Сегодня";
    }

    if (isYesterday(date)) {
      return "Вчера";
    }

    return format(date, "d MMMM yyyy", { locale: ru });
  };

  const formatMessageTime = (dateInput: Date | string) => {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    if (isNaN(date.getTime())) {
      console.error("Invalid date:", dateInput);
      return "";
    }

    return format(date, "HH:mm", { locale: ru });
  };

  return (
    <>
      {showDate && (
        <div className={styles.dataMessage}>
          <div className={styles.line}></div>
          <div className={styles.dataMessageItem}>
            {formatMessageDate(message.createdAt)}
          </div>
          <div className={styles.line}></div>
        </div>
      )}
      <div
        className={cn(styles.chatMessageWrapper, {
          [styles.myMessage]: isMyMessage,
        })}
      >
        <div>
          <div className={styles.ava}>
            {message.user.avatar ? (
              <img src={message.user.avatar} alt="" />
            ) : (
              <AvatarPlug name={message.user.name} />
            )}
          </div>
        </div>
        <div className={styles.message}>
          <p className={styles.name}>{message.user.name}</p>
          <p className={styles.text}>{message.message}</p>
          <p className={styles.dateTime}>
            {formatMessageTime(message.createdAt)}
          </p>
        </div>
      </div>
    </>
  );
}
