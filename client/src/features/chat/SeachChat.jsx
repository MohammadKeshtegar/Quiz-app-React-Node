import { useEffect, useState } from "react";
import SearchedQuizzesTable from "./SearchedQuizzesTable";
import useFilterChats from "./useFilterChats";
import useDebounce from "../../hooks/useDebounce";

export default function SeacrhChat() {
  const { chatName, setFilter } = useFilterChats();
  const [localSearchedChats, setLocalSearchedChats] = useState(chatName);
  const debouncedSearchedChats = useDebounce(localSearchedChats);

  useEffect(
    function () {
      setFilter({ chatName: debouncedSearchedChats });
    },
    [setFilter, debouncedSearchedChats]
  );

  return (
    <div className="flex flex-col gap-5 w-[600px]">
      <input type="text" className="input-auth-style" placeholder="Search group" onChange={(e) => setLocalSearchedChats(e.target.value)} />

      <SearchedQuizzesTable chatName={chatName} />
    </div>
  );
}
