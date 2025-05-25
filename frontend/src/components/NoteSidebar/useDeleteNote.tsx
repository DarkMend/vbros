import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteNote } from "../../utils/hooks/Note/useDeleteNote";
import { useSibebarStore } from "../../store/sidebar.store";
import { useModalStore } from "../../store/modalStore";
import { useDeleteTask } from "../../utils/hooks/Task/useDeleteTask";
import { useParams } from "react-router-dom";

// Удаление
export const useDeleteNoteHook = () => {
  const { closeSidebar } = useSibebarStore();
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useDeleteNote({
    onError(data) {
      toast.error(data.response?.data?.message);
    },
    onSuccess() {
      toast.success("Заметка успешно удалена");
      queryClient.invalidateQueries({ queryKey: ["statuses"] });
      closeSidebar();
      closeModal();
    },
  });

  return { mutate, isPending };
};

export const useDeleteTaskHook = () => {
  const { closeSidebar } = useSibebarStore();
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { mutate, isPending } = useDeleteTask({
    onError(data) {
      toast.error(data.response?.data?.message);
    },
    onSuccess() {
      toast.success("Задача успешно удалена");
      queryClient.invalidateQueries({
        queryKey: ["projectStatuses", id ? parseInt(id) : NaN],
      });
      closeSidebar();
      closeModal();
    },
  });

  return { mutate, isPending };
};
