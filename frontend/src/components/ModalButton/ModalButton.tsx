import Loader from "../Loader/Loader";
import styles from "./ModalButton.module.scss";
import { IModalButton } from "./ModalButton.props";
import cn from "classnames";
import TrashIcon from "../../../public/icons/trash.svg";

export default function ModalButton({
  children,
  icon,
  isLoading,
  className,
  typeButton,
  textNone = false,
  ...props
}: IModalButton) {
  return (
    <button
      className={cn(styles["button"], className, {
        [styles.delete]: typeButton === "delete",
      })}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {typeButton === "delete" ? (
            <TrashIcon />
          ) : (
            icon && <div className={styles["icon"]}>{icon}</div>
          )}
          {textNone ? (
            ""
          ) : (
            <p>{typeButton === "delete" ? "Удалить" : children}</p>
          )}
        </>
      )}
    </button>
  );
}
