import ModalLayout from "../../ModalLayout/ModalLayout";
import UserChangeIcon from "../../../../public/icons/user-change.svg";
import MainInput from "../../MainInput/MainInput";
import styles from "./ChangeNameModal.module.scss";
import ModalButton from "../../ModalButton/ModalButton";
import BackIcon from "../../../../public/icons/back.svg";
import { useModalStore } from "../../../store/modalStore";
import AccountModal from "../AccountModal/AccountModal";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUser } from "../../../interfaces/user.interface";
import { useChangeName } from "../../../utils/hooks/User/useChangeName";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import ParagraphModal from "../../ParagraphModal/ParagraphModal";

export type IFormChangeName = Pick<IUser, "name">;

export default function ChangeNameModal() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormChangeName>();
  const { openModal } = useModalStore();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useChangeName({
    onSuccess() {
      toast.success("Вы успешно сменили имя");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError(data) {
      toast.error(data.response?.data?.message);
    },
  });

  const back = () => {
    openModal(<AccountModal />);
  };

  const onSubmit: SubmitHandler<IFormChangeName> = (data) => {
    mutate(data);
  };

  return (
    <ModalLayout icon={<UserChangeIcon />} title="Редактирование имени">
      <form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
        <MainInput
          placeholder="Имя пользователя"
          {...register("name", {
            required: "Введите имя",
          })}
          errorMessage={errors.name?.message}
        />
        <ParagraphModal>
          Вы можете редактировать имя пользователя.
        </ParagraphModal>
        <ParagraphModal>
          По этой информации вас могут найти другие пользователи.
        </ParagraphModal>
        <div className={styles["buttons__wrapper"]}>
          <ModalButton icon={<BackIcon />} onClick={back} type="button">
            Назад
          </ModalButton>
          <ModalButton isLoading={isPending}>Сохранить</ModalButton>
        </div>
      </form>
    </ModalLayout>
  );
}
