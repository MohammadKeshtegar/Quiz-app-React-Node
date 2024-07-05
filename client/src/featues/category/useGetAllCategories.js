import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../services/apiCategory";

export function useGetAllCategories() {
  const { isLoading, data } = useQuery({
    queryKey: ["category"],
    queryFn: getAllCategories,
  });

  return { data, isLoading };
}
