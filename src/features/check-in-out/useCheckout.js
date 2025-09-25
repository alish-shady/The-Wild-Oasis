import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isPending } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onError: (err) => toast.error(err.message),
    onSuccess: (data) => {
      toast.success(
        `The booking number #${data.id} was successfully checked out.`
      );
      queryClient.invalidateQueries({ active: true });
    },
  });
  return { checkout, isPending };
}
