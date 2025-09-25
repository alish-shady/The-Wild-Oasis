import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      toast.success("Cabin was successfully deleted!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
  });

  return { isPending, mutate };
}
