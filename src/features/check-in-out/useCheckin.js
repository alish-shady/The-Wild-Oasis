import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isPending } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onError: (err) => toast.error(err.message),
    onSuccess: (data) => {
      toast.success(
        `The booking number #${data.id} was successfully checked in.`
      );
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
  });
  return { checkin, isPending };
}
