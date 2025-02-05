import { useEffect, useState } from "react";

import { useFilterUsers } from "./useFilterUsers";
import useDebounce from "../../hooks/useDebounce";
import UsersTable from "./UsersTable";

function ManageUsers() {
  const { username, setFilter } = useFilterUsers();
  const [localSearchedUsername, setLocalSearchedUsername] = useState(username);
  const debouncedSearch = useDebounce(localSearchedUsername);

  useEffect(
    function () {
      setFilter({ username: debouncedSearch });
    },
    [setFilter, debouncedSearch]
  );

  return (
    <div className="flex flex-col gap-4 relative rounded overflow-hidden w-full p-3 text-white h-full">
      <div className="w-80">
        <input type="text" placeholder="Search user" className="input-auth-style" onChange={(e) => setLocalSearchedUsername(e.target.value)} />
      </div>

      <UsersTable username={username} />
    </div>
  );
}

export default ManageUsers;
