import { getSettings } from "../../services/apiSettings";
import { useQuery } from "@tanstack/react-query";

export default function useSettings() {
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { settings, isLoading, error };
}
