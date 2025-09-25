import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isPending, mutate: deleteBookingQuery } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      toast.success("Booking was successfully deleted!");
      queryClient.invalidateQueries({ active: true });
    },
  });

  return { isPending, deleteBookingQuery };
}
