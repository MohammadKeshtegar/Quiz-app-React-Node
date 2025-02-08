import { useQuery } from "@tanstack/react-query";
import { getAllInboxes } from "../../services/apiInbox";

export function useGetAllInbox() {
  const { isLoading, data } = useQuery({
    queryKey: ["inboxes"],
    queryFn: getAllInboxes,
  });

  return { isLoading, data };
}
