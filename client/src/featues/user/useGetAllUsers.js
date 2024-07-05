import { useQuery } from "@tanstack/react-query";
import { getAllUsers as getAllUsersApi } from "../../services/apiUser";

export function useGetAllUsers(admin) {
  const { data, isLoading } = useQuery({
    queryFn: () => getAllUsersApi(admin),
    queryKey: ["user"],
  });

  return { data, isLoading };
}
