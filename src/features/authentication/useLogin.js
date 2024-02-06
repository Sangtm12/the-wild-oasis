import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading: isLogginIn } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      navigate("/upload-data");
    },
    onError: (err) => {
      console.log(err);
      toast.error(
        "Wrong email or password. \nPlease don't change default login credentials"
      );
    },
  });
  return { login, isLogginIn };
}
