import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../../../services/user.service";
import { useUserStore } from "../../../store/userStore";
import { removeToken } from "../../helpers/removeToken";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "../../../store/modalStore";

export const useLogoutUser = () => {
  const KEY = "logout";
  const { deleteUser } = useUserStore();
  const { closeModal } = useModalStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: [KEY],
    mutationFn: () => userService.logout(),
    onSuccess() {
      deleteUser();
      removeToken();
      navigate("/auth/start");
      queryClient.clear();
      closeModal();
    },
  });

  const logout = () => {
    mutate();
  };

  return { logout, isPending };
};
