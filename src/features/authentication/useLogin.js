import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error(
        err.message.includes("not confirmed")
          ? "Please verify the account through the email that has been sent to you."
          : "Provided email or password are incorrect."
      );
    },
  });
  return { login, isPending };
}
