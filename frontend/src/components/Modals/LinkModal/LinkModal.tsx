import MainInput from "../../MainInput/MainInput";
import ModalLayout from "../../ModalLayout/ModalLayout";
import ShareIcon from "./../../../../public/icons/share.svg";

export default function LinkModal({ value }: { value: string }) {
  return (
    <ModalLayout icon={<ShareIcon />} title="Ссылка на проект">
      <MainInput readOnly value={value} style={{ fontSize: "14px" }} />
    </ModalLayout>
  );
}
