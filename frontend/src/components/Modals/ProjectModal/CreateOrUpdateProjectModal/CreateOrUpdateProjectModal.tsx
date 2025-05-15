import { useModalStore } from "../../../../store/modalStore";
import MainInput from "../../../MainInput/MainInput";
import MainTextarea from "../../../MainTextarea/MainTextarea";
import ModalFormLayout from "../../../ModalFormLayout/ModalFormLayout";
import ModalLayout from "../../../ModalLayout/ModalLayout";
import TeamProjectIcon from "./../../../../../public/icons/team-project.svg";
import styles from "./CreateOrUpdateProjectModal.module.scss";

export default function CreateOrUpdateProjectModal() {
  const { closeModal } = useModalStore();

  return (
    <ModalLayout icon={<TeamProjectIcon />} title="Новый проект">
      <ModalFormLayout
        submitButtonText="Создать"
        closeHandle={() => closeModal()}
      >
        <MainInput placeholder="Название" />
        <MainTextarea placeholder="Описание" />
      </ModalFormLayout>
    </ModalLayout>
  );
}
