import Loader from "../Loader/Loader";
import styles from "./ModalButton.module.scss";
import { IModalButton } from "./ModalButton.props";

export default function ModalButton({
  children,
  icon,
  isLoading = false,
  ...props
}: IModalButton) {
  return (
    <button className={styles["button"]} {...props}>
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
