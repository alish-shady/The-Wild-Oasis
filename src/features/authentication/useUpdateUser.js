import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isPending, mutate: updateUser } = useMutation({
    mutationFn: (data) => updateCurrentUser(data),
    onSuccess: () => {
      toast.success("The user information was successfully updated!");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isPending, updateUser };
}
