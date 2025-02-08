import { useQuery } from "@tanstack/react-query";
import { getInbox } from "../../services/apiInbox";

export function useGetInbox(inboxID) {
  const { isLoading, data } = useQuery({
    queryKey: ["inbox", inboxID],
    queryFn: () => getInbox(inboxID),
  });

  return { isLoading, data };
}
