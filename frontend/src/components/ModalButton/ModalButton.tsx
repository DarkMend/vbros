import Loader from "../Loader/Loader";
import styles from "./ModalButton.module.scss";
import { IModalButton } from "./ModalButton.props";
import cn from "classnames";

export default function ModalButton({
  children,
  icon,
  isLoading = false,
  className,
  ...props
}: IModalButton) {
  return (
    <button className={cn(styles["button"], className)} {...props}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {icon && <div className={styles["icon"]}>{icon}</div>}
          <p>{children}</p>
        </>
      )}
    </button>
  );
}
