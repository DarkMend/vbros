import MainButton from "../MainButton/MainButton";
import styles from "./FormLayout.module.scss";
import { IFormLayout } from "./FormLayout.props";

export default function FormLayout({ children, isLoading, buttonText, ...props }: IFormLayout) {
  return (
    <form className={styles["form"]} {...props}>
      <div className={styles["form__wrapper"]}>
        {children}
      </div>
      <MainButton theme="white" isLoading={isLoading}>{buttonText}</MainButton>
    </form>
  );
}
