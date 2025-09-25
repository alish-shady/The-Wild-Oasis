import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateUpdateCabin(editId) {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success(
        editId === undefined
          ? "New cabin was successfully created!"
          : "The cabin was successfully edited!"
      );
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isPending, mutate };
}
