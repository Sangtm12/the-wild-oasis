import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { ROWS_PER_PAGE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  //status FILTER
  const status = searchParams.get("status");

  //SORT
  const sort = searchParams.get("sort");

  //PAGINATION

  const page = +searchParams.get("page") || 1;

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", status, sort, page],
    queryFn: () => {
      return getBookings(status, sort, page);
    },
  });

  //PRE-FETCHING

  if (page < Math.ceil(count / ROWS_PER_PAGE)) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", status, sort, page + 1],
      queryFn: () => {
        return getBookings(status, sort, page + 1);
      },
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", status, sort, page - 1],
      queryFn: () => {
        return getBookings(status, sort, page - 1);
      },
    });
  }

  return { isLoading, bookings, count, error };
}
