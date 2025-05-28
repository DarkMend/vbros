import AvatarPlug from "../../AvatarPlug/AvatarPlug";
import cn from "classnames";
import styles from "./MessageItem.module.scss";
import { IMessage } from "../../../interfaces/message.interface";

export interface IMessageItem {
  message: IMessage;
  isMyMessage?: boolean;
}

export default function MessageItem({ message, isMyMessage }: IMessageItem) {
  return (
    <div
      className={cn(styles.chatMessageWrapper, {
        [styles.myMessage]: isMyMessage,
      })}
    >
      <div>
        <div className={styles.ava}>
          <AvatarPlug name={message.user.name} />
        </div>
      </div>
      <div className={styles.message}>
        <p className={styles.name}>{message.user.name}</p>
        <p className={styles.text}>{message.message}</p>
      </div>
    </div>
  );
}
