import { toast } from "react-toastify";
import { useModalStore } from "../../../../store/modalStore";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteProject } from "../../../../utils/hooks/Project/useDeleteProject";
import { useExitProject } from "../../../../utils/hooks/Project/useExitProject";
import { useDeleteUser } from "../../../../utils/hooks/Project/useDeleteUser";

// Удаление
export const useDeleteProjectHook = () => {
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const route = useNavigate();

  const { mutate, isPending } = useDeleteProject({
    onError(data) {
      toast.error(data.response?.data?.message);
    },
    onSuccess() {
      toast.success("Проект успешно удален");
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["getProjects"] });
      route("/notes");
    },
  });

  return { mutate, isPending };
};

export const useExitProjectHook = () => {
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const route = useNavigate();

  const { mutate, isPending } = useExitProject({
    onError(data) {
      toast.error(data.response?.data?.message);
    },
    onSuccess() {
      toast.success("Вы покинули проект");
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["getProjects"] });
      route("/notes");
    },
  });

  return { mutate, isPending };
};

export const useDeleteUserHook = () => {
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { mutate, isPending } = useDeleteUser({
    onError(data) {
      toast.error(data.response?.data?.message);
    },
    onSuccess() {
      toast.success("Человек исключен");
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["project", id] });
      queryClient.invalidateQueries({
        queryKey: ["['projectStatuses', id]", id],
      });
    },
  });

  return { mutate, isPending };
};
