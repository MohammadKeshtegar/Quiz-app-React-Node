import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function useFilterSortQuizzes() {
  const [searchParams, setSearchParams] = useSearchParams();

  const owner = searchParams.get("owner") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";

  const setFilterSort = useCallback(
    (filterSort) => {
      setSearchParams((params) => {
        if (filterSort.owner || filterSort.owner === "") params.set("owner", filterSort.owner);
        if (filterSort.category) params.set("category", filterSort.category);
        if (filterSort.sort) params.set("sort", filterSort.sort);

        return params;
      });
    },
    [setSearchParams]
  );

  return { owner, category, sort, setFilterSort };
}
