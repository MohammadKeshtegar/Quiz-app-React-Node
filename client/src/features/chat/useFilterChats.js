import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function useFilterChats() {
  const [searchParams, setSearchParams] = useSearchParams();

  const chatName = searchParams.get("chatName") || "";

  const setFilter = useCallback(
    (filter) => setSearchParams((params) => (filter.chatName !== undefined ? params.set("chatName", filter.chatName) : params)),
    [setSearchParams]
  );

  return { chatName, setFilter };
}
