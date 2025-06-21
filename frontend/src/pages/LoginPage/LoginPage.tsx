import { Link, useNavigate } from "react-router-dom";
import FormLayout from "../../components/FormLayout/FormLayout";
import MainInput from "../../components/MainInput/MainInput";
import styles from "./LoginPage.module.scss";
import MainButton from "../../components/MainButton/MainButton";
import { useForm } from "react-hook-form";
import { useLoginUser } from "../../utils/hooks/User/useLoginUser";
import { IUser } from "../../interfaces/user.interface";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

type IFormLogin = Omit<IUser, "name">;

export interface ILoginResponse {
  message: string;
  token: string;
  user: IUser;
}

export default function LoginPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormLogin>({
    mode: "onSubmit",
  });

  const route = useNavigate();

  const { mutate, isPending } = useLoginUser({
    onSuccess(data) {
      Cookies.set("access_token", data.token, { sameSite: "strict" });
      toast.success(data?.message);
      route("/notes");
    },
    onError(error) {
      toast.error(error.response?.data?.message, {
        autoClose: false,
      });
      console.log(error);
    },
  });

  const onSubmit = (data: IFormLogin) => {
    mutate(data);
  };

  return (
    <div className={styles["auth-page"]}>
      <h1>Войдите в аккаунт</h1>
      <FormLayout
        onSubmit={handleSubmit(onSubmit)}
        isLoading={isPending}
        buttonText="Войти"
      >
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
          })}
          errorMessage={errors.password?.message}
        />
      </FormLayout>
      <div className={styles["transition-block"]}>
        <p className={styles["transition-block__text"]}>У вас нет аккаунта?</p>
        <Link to={"/auth/reg"}>
          <MainButton theme="white">Зарегистрироваться</MainButton>
        </Link>
      </div>
    </div>
  );
}
