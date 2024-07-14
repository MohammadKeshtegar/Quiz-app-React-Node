import { useQuery } from "@tanstack/react-query";
import { getAllInboxes } from "../../services/apiInbox";

export function useGetInboxes(user) {
  const { isLoading, data } = useQuery({
    queryFn: () => getAllInboxes(user),
    queryKey: ["inbox"],
  });

  return { isLoading, data };
}
