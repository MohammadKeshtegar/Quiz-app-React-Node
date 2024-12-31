import { USER_TABLE_HEADER } from "../../constant/constant";
import { useGetAllUsers } from "./useGetAllUsers";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import UserRow from "./UserRow";

function ManageUsers() {
  const { data, isLoading } = useGetAllUsers(true);

  if (isLoading) return <Spinner />;
  const { data: users } = data;

  function handleSortUsers() {}

  function handleFilterUsers() {}

  return (
    <div className="flex flex-col gap-4 relative rounded overflow-hidden w-full p-3 text-white h-full">
      <div className="w-full flex gap-2 items-center justify-end">
        <div>
          <input type="text" placeholder="Search user" className="input-auth-style" />
        </div>

        <div>
          <select name="user-filter" id="user-filter" className="select-input-style">
            <option value="Points - Ascending">Points - Ascending</option>
            <option value="Points - Descending">Points - Descending</option>
            <option value="Rank - Ascending">Rank - Ascending</option>
            <option value="Rank - Descending">Rank - Descending</option>
          </select>
        </div>
      </div>
      {users.length > 0 ? (
        <Table>
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
