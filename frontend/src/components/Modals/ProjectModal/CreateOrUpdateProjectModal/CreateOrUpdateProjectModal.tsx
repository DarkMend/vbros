import { ChangeEventHandler, useEffect, useMemo, useState } from "react";
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
import { useUpdateProject } from "../../../../utils/hooks/Project/useUpdateProject";

export interface ICreateOrUpdateProjectModal {
  update?: IProject;
}

export default function CreateOrUpdateProjectModal({
  update,
}: ICreateOrUpdateProjectModal) {
  const { closeModal } = useModalStore();
  const [image, setImage] = useState<File | string | null>(null);
  const [isSvg, setIsSvg] = useState<boolean>(false);
  const queryClient = useQueryClient();

  // создание формы

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IProject>();

  useEffect(() => {
    if (update) {
      reset({
        name: update.name,
        description: update.description,
      });
    }

    if (update?.icon) {
      setImage(update.icon);
      setIsSvg((update.icon as string).endsWith(".svg"));
    }
  }, [update, reset]);

  // предзагрузка изображений
  const imageUrl = useMemo(() => {
    if (!image) return null;

    if (typeof image === "string") {
      return image;
    }

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

  // создание
  const { mutate: createMutate, isPending: isCreatePending } = useCreateProject(
    {
      onSuccess() {
        reset();
        toast.success("Проект успешно создан");
        queryClient.invalidateQueries({ queryKey: ["getProjects"] });
        setImage(null);
        setIsSvg(false);
        closeModal();
      },
      onError(data) {
        toast.error(data.response?.data?.message);
      },
    }
  );

  // update
  const { mutate: updateMutate, isPending: updatePending } = useUpdateProject({
    onSuccess() {
      reset();
      toast.success("Проект успешно обновлен");
      queryClient.invalidateQueries({ queryKey: ["project", update?.id] });
      queryClient.invalidateQueries({
        queryKey: ["projectStatuses", update?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["getProjects"],
      });
      setImage(null);
      setIsSvg(false);
      closeModal();
    },
    onError(data) {
      toast.error(data.response?.data?.message);
    },
  });

  const onSubmit = (data: IProject) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (image && typeof image !== "string") formData.append("icon", image);

    if (update) {
      formData.append("id", update?.id.toString());
      updateMutate(formData);
    } else {
      createMutate(formData);
    }
  };

  return (
    <ModalLayout
      icon={<TeamProjectIcon />}
      title={update ? "Редактирование проекта" : "Новый проект"}
    >
      <ModalFormLayout
        submitButtonText={update ? "Сохранить" : "Создать"}
        closeHandle={() => closeModal()}
        onSubmit={handleSubmit(onSubmit)}
        isPending={isCreatePending || updatePending}
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
