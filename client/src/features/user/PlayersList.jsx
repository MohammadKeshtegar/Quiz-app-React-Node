import { useEffect, useState } from "react";

import useDebounce from "../../hooks/useDebounce";
import { useFilterUsers } from "./useFilterUsers";
import PlayerTable from "./PlayerTable";

function PlayersList() {
  const { username, setFilter } = useFilterUsers();
  const [localSearchedUsername, setLocalSearchedUsername] = useState(username);
  const debouncedSearchedUsername = useDebounce(localSearchedUsername);

  useEffect(
    function () {
      setFilter({ username: debouncedSearchedUsername });
    },
    [setFilter, debouncedSearchedUsername]
  );

  return (
    <div className="w-full h-full p-5 text-white flex flex-col gap-5">
      <div className="flex items-center gap-7 w-80">
        <input type="text" placeholder="Enter user name" className="input-auth-style" onChange={(e) => setLocalSearchedUsername(e.target.value)} />
      </div>

      <PlayerTable username={username} />
    </div>
  );
}

export default PlayersList;
