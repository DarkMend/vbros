import { ChangeEventHandler, useMemo, useState } from "react";
import { useModalStore } from "../../../../store/modalStore";
import ImageLoader from "../../../ImageLoader/ImageLoader";
import MainInput from "../../../MainInput/MainInput";
import MainTextarea from "../../../MainTextarea/MainTextarea";
import ModalFormLayout from "../../../ModalFormLayout/ModalFormLayout";
import ModalLayout from "../../../ModalLayout/ModalLayout";
import TeamProjectIcon from "./../../../../../public/icons/team-project.svg";
import { useCreateProject } from "../../../../utils/hooks/Project/useCreateProject";
import { useForm } from "react-hook-form";
import { IProject } from "../../../../interfaces/project.interface";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateOrUpdateProjectModal() {
  const { closeModal } = useModalStore();
  const [image, setImage] = useState<File | null>(null);
  const [isSvg, setIsSvg] = useState<boolean>(false);
  const queryClient = useQueryClient();

  // предзагрузка изображений
  const imageUrl = useMemo(() => {
    if (!image) return null;
    return URL.createObjectURL(image);
  }, [image]);

  const uploadImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);

      const isSvgFile =
        file.type === "image/svg+xml" ||
        file.name.toLowerCase().endsWith(".svg");
      setIsSvg(isSvgFile);
    }
  };

  // создание формы

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IProject>();

  const { mutate: createMutate, isPending: isCreatePending } = useCreateProject(
    {
      onSuccess() {
        reset();
        toast.success("Проект успешно создан");
        queryClient.invalidateQueries({ queryKey: ["getProjects"] });
        setImage(null);
        setIsSvg(false);
      },
      onError(data) {
        toast.error(data.response?.data?.message);
      },
    }
  );

  const onSubmit = (data: IProject) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    if (image) formData.append("icon", image);

    createMutate(formData);
  };

  return (
    <ModalLayout icon={<TeamProjectIcon />} title="Новый проект">
      <ModalFormLayout
        submitButtonText="Создать"
        closeHandle={() => closeModal()}
        onSubmit={handleSubmit(onSubmit)}
        isPending={isCreatePending}
      >
        <MainInput
          placeholder="Название"
          {...register("name", {
            required: "Введите название",
          })}
          errorMessage={errors?.name?.message}
        />
        <MainTextarea
          placeholder="Описание"
          {...register("description", {
            required: "Введите описание",
          })}
          errorMessage={errors?.description?.message}
        />
        <ImageLoader image={imageUrl} onChange={uploadImage} isSvg={isSvg} />
      </ModalFormLayout>
    </ModalLayout>
  );
}
