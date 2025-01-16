import { useEffect, useState } from "react";

import { USER_TABLE_HEADER } from "../../constant/constant";
import { useGetAllUsers } from "./useGetAllUsers";
import useDebounce from "../../hooks/useDebounce";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import UserRow from "./UserRow";

function ManageUsers() {
  const { data, isLoading } = useGetAllUsers(true);
  const [name, setName] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoadingFilteredUsers, setIsLoadingFilteredUsers] = useState(false);
  const debouncedSearch = useDebounce(name);

  useEffect(
    function () {
      try {
        async function getfilteredUsers() {
          if (debouncedSearch === "") return;
          setIsLoadingFilteredUsers(true);

          const res = await fetch(`/api/v1/users?admin=true&filter=${name}`);
          const data = await res.json();

          setIsLoadingFilteredUsers(false);
          setFilteredUsers(data.data);
        }
        getfilteredUsers();
      } catch (err) {
        console.error(err);
        setIsLoadingFilteredUsers(false);
      }
    },
    [debouncedSearch, name]
  );

  if (isLoading) return <Spinner />;
  const { data: allUsers } = data;

  const users = debouncedSearch ? filteredUsers : allUsers;

  return (
    <div className="flex flex-col gap-4 relative rounded overflow-hidden w-full p-3 text-white h-full">
      <div className="w-80 ml-auto">
        <input type="text" placeholder="Search user" className="input-auth-style" onChange={(e) => setName(e.target.value)} />
      </div>

      {users.length > 0 ? (
        <Table tableStyle="relative overflow-y-clip">
          {isLoadingFilteredUsers && (
            <div className="w-full h-full bg-neutral-800/80 text-white absolute flex items-center justify-center">
              <Spinner />
            </div>
          )}

          <Table.Header headerTitles={USER_TABLE_HEADER} headerStyle={`grid-cols-8`} />

          <Table.Body data={users} render={(user, i) => <UserRow key={user._id} user={user} index={i} />} />

          <Table.Footer>
            <Table.Pagination itemsLength={users.length} />
          </Table.Footer>
        </Table>
      ) : (
        <div className="flex items-center justify-center text-xl text-neutral-500">No user found! 😢</div>
      )}
    </div>
  );
}

export default ManageUsers;
