import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

export function useFilterUsers() {
  const [searchParams, setSearchParams] = useSearchParams();

  const username = searchParams.get("username") || "";

  const setFilter = useCallback(
    (filter) => setSearchParams((params) => (filter.username !== undefined ? params.set("username", filter.username) : params)),
    [setSearchParams]
  );

  return { username, setFilter };
}
