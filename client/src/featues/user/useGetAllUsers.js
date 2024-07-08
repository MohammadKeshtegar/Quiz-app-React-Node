import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/apiUser";

export function useGetAllUsers(admin) {
  const { data, isLoading } = useQuery({
    queryFn: () => getAllUsers(admin),
    queryKey: ["user"],
  });

  return { data, isLoading };
}
