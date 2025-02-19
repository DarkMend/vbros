import { Link, useNavigate } from "react-router-dom";
import FormLayout from "../../components/FormLayout/FormLayout";
import MainButton from "../../components/MainButton/MainButton";
import MainInput from "../../components/MainInput/MainInput";
import styles from "./RegPage.module.scss";
import { useForm } from "react-hook-form";
import { useCreateUser } from "../../utils/hooks/User/useCreateUser";
import { toast } from "react-toastify";

export interface IFormReg {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default function RegPage() {

  const router = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IFormReg>({
    mode: "onSubmit",
  });

  const { mutate, isPending } = useCreateUser({
    onSuccess(){
      toast.success('Акакунт успешно создан');
      router('/auth/login');
    },
    onError(error){
      toast.error(error.response?.data?.message, {
        autoClose: false,
      });
    }
  })

  const onSubmit = (data: IFormReg) => {
    mutate(data);
  };

  return (
    <div className={styles["auth-page"]}>
      <h1>Создайте аккаунт</h1>
      <FormLayout onSubmit={handleSubmit(onSubmit)} isLoading={isPending}>
        <MainInput
          placeholder="Имя"
          {...register("name", {
            required: "Заполните имя",
          })}
          errorMessage={errors.name?.message}
        />
        <MainInput
          placeholder="Почта"
          {...register("email", {
            required: "Заполните почту",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Введите корректную почту",
            },
          })}
          errorMessage={errors.email?.message}
        />
        <MainInput
          placeholder="Пароль"
          type="password"
          {...register("password", {
            required: "Заполните пароль",
            minLength: {
              value: 6,
              message: "В пароле должно быть не менее 6 символов",
            },
          })}
          errorMessage={errors.password?.message}
        />
        <MainInput
          placeholder="Подтверждение пароля"
          type="password"
          {...register("password_confirmation", {
            required: "Заполните подтверждение пароля",
            validate: (val: string) => {
              if (watch("password") != val) {
                return "Пароли не совпадают";
              }
            },
          })}
          errorMessage={errors.password_confirmation?.message}
        />
      </FormLayout>
      <div className={styles["transition-block"]}>
        <p className={styles["transition-block__text"]}>У вас есть аккаунт?</p>
        <Link to={"/auth/login"}>
          <MainButton theme="white">Войти</MainButton>
        </Link>
      </div>
    </div>
  )
}
