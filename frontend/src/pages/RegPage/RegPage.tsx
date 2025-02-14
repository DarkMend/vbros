import FormLayout from "../../components/FormLayout/FormLayout";
import MainButton from "../../components/MainButton/MainButton";
import MainInput from "../../components/MainInput/MainInput";
import styles from "./RegPage.module.scss";
import { useForm } from "react-hook-form";

export default function RegPage() {
  const { register, formState: {errors} } = useForm({
    mode: "onChange",
  });

  return (
    <div className={styles["auth-page"]}>
      <h1>Создайте аккаунт</h1>
      <FormLayout>
        <MainInput placeholder="Имя" {...register('name', {
            required: 'Заполните имя',
        })} errorMessage={errors.name && errors.name.message} />
        <MainInput placeholder="ss" />
        <MainInput placeholder="ff" />
      </FormLayout>
      <div className={styles["transition-block"]}>
        <p className={styles["transition-block__text"]}>У вас есть аккаунт?</p>
        <MainButton theme="white">Войти</MainButton>
      </div>
    </div>
  );
}
