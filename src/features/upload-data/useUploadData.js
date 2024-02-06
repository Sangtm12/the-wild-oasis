import { useMutation } from "@tanstack/react-query";
import { createBookings, deleteBookings } from "../../data/Uploader";
import toast from "react-hot-toast";

async function deleteAndCreateBookings() {
  await deleteBookings();
  await createBookings();
}

export default function useUploadData() {
  const { mutate: refreshData, isLoading: isRefreshingData } = useMutation({
    mutationFn: deleteAndCreateBookings,
    onError: () => {
      toast.error("Could not refresh booking data");
    },
  });
  return { refreshData, isRefreshingData };
}
