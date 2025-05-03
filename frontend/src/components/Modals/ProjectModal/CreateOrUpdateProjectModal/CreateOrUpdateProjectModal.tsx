import MainInput from "../../../MainInput/MainInput";
import ModalFormLayout from "../../../ModalFormLayout/ModalFormLayout";
import ModalLayout from "../../../ModalLayout/ModalLayout";
import ModalMenuItem from "../../../ModalMenuItem/ModalMenuItem";
import TeamProjectIcon from "./../../../../../public/icons/team-project.svg";

export default function CreateOrUpdateProjectModal() {
  return (
    <ModalLayout icon={<TeamProjectIcon />} title="Новый проект">
      <ModalFormLayout submitButtonText="Создать">
        <MainInput placeholder="Название" />
        <ModalMenuItem name="Иконка" icon={<TeamProjectIcon />} />
      </ModalFormLayout>
    </ModalLayout>
  );
}
