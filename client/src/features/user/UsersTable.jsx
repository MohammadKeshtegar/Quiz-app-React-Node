import { USER_TABLE_HEADER } from "../../constant/constant";
import { useGetAllUsers } from "./useGetAllUsers";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import UserRow from "./UserRow";

export default function UsersTable({ username }) {
  const { data, isLoading } = useGetAllUsers({ isAdmin: true, username });

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  const { data: users } = data;

  return (
    <>
      {users.length > 0 ? (
        <Table tableStyle="relative overflow-y-clip">
          <Table.Header headerTitles={USER_TABLE_HEADER} headerStyle={`grid-cols-8`} />

          <Table.Body data={users} render={(user, i) => <UserRow key={user._id} user={user} index={i} />} />

          <Table.Footer>
            <Table.Pagination itemsLength={users.length} />
          </Table.Footer>
        </Table>
      ) : (
        <div className="flex items-center justify-center text-xl text-neutral-500">No user found! 😢</div>
      )}
    </>
  );
}
