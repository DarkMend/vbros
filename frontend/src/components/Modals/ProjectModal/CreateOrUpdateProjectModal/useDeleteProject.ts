import { toast } from "react-toastify";
import { useModalStore } from "../../../../store/modalStore";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDeleteProject } from "../../../../utils/hooks/Project/useDeleteProject";

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
