import { toast } from "react-toastify";
import { useDeleteStatus } from "../../../../utils/hooks/Status/useDeleteStatus";
import { useModalStore } from "../../../../store/modalStore";
import { useQueryClient } from "@tanstack/react-query";

// Удаление
export const useDeleteStatusHook = () => {
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useDeleteStatus({
    onError(data) {
      toast.error(data.response?.data?.message);
    },
    onSuccess() {
      toast.success("Cтатус успешно удален");
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["statuses"] });
    },
  });

  return { mutate, isPending };
};
