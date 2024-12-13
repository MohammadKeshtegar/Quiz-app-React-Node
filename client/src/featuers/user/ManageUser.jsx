import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { USER_TABLE_HEADER } from "../../constant/constant";
import PaginationButton from "../../ui/PaginationButton";
import { useGetAllUsers } from "./useGetAllUsers";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import UserRow from "./UserRow";

function ManageUsers() {
  const { data, isLoading } = useGetAllUsers(true);

  if (isLoading) return <Spinner />;
  const { data: users } = data;

  return (
    <div className="relative rounded overflow-hidden w-full p-3 text-white">
      {users.length > 0 ? (
        <Table>
          <Table.Header headerTitles={USER_TABLE_HEADER} headerStyle={`grid-cols-8`} />

          <Table.Body data={users} render={(user, i) => <UserRow key={user._id} user={user} index={i} />} bodyStyle="border border-neutral-700/50" />

          <Table.Footer>
            <div>
              <p className="text-lg">
                Total users: <span className="font-semibold">{users.length}</span>
              </p>
            </div>

            <div className="border-2 rounded flex items-center">
              <PaginationButton>
                <FaChevronLeft />
              </PaginationButton>

              <div className="border-x-2 px-4 py-1 bg-neutral-600">0</div>

              <PaginationButton>
                <FaChevronRight />
              </PaginationButton>
            </div>
          </Table.Footer>
        </Table>
      ) : (
        <div className="flex items-center justify-center text-xl text-neutral-500">No user found! 😢</div>
      )}
    </div>
  );
}

export default ManageUsers;
