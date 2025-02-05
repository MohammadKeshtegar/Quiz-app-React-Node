import { useGetAllUsers } from "../user/useGetAllUsers";
import { useUserStorage } from "../../states/store";
import ChatUsersItem from "./ChatUsersItem";
import Spinner from "../../ui/Spinner";

export default function SelectUsersToCreateChat({ setSelectedUsers, selectedUsers, username }) {
  const { data, isLoading } = useGetAllUsers({ isAdmin: false, maxUsers: 50, username });
  const { user: storedUser } = useUserStorage();

  if (isLoading)
    return (
      <div className="w-full flex items-center justify-center h-20 bg-neutral-700 rounded">
        <Spinner />
      </div>
    );
  const { data: users } = data;

  return (
    <ul className="dark:bg-neutral-600 bg-neutral-200 rounded p-1 max-h-96 overflow-y-auto divide-y-2 divide-neutral-500">
      {users.map(
        (user, i) =>
          user._id !== storedUser._id && (
            <ChatUsersItem
              key={user._id}
              index={i}
              username={user.username}
              userPhoto={user.photo}
              userID={user._id}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
            />
          )
      )}
    </ul>
  );
}
