import { useQuery } from "@tanstack/react-query";
import { getAllUsers as getAllUsersApi } from "../../services/apiUser";

export function useGetAllUsers(queryies) {
  const { data, isLoading } = useQuery({
    queryFn: () => getAllUsersApi(queryies),
    queryKey: ["user", queryies],
  });

  return { data, isLoading };
}
