import { forwardRef } from "react";
import styles from "./ProfileIconButton.module.scss";
import { IProfileIconButton } from "./ProfileIconButton.props";

const ProfileIconButton = forwardRef<HTMLButtonElement, IProfileIconButton>(
  ({ children, ...props }, ref) => {
    return (
      <button {...props} className={styles["button"]} ref={ref}>
        {children}
      </button>
    );
  }
);

export default ProfileIconButton;
