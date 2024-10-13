import { useEffect, useState } from "react";
import ChatUsersItem from "./ChatUsersItem";

function SelectUserFromUsersList({ fetchedUsers, selectedUsers, currentUser, handleUser }) {
  const [usersList, setUsersList] = useState([]);

  console.log(usersList);

  useEffect(function () {
    setUsersList(fetchedUsers);
  }, []);

  function filterUsers(e) {
    if (e.target.value.length === 0) {
      setUsersList(fetchedUsers);
    } else {
      const uss = usersList.filter((user) => user.username.startsWith(e.target.value));
      setUsersList(uss);
    }
  }

  return (
    <>
      <input type="text" placeholder="Seach user" className="input-auth-style mb-3" onChange={filterUsers} />

      {usersList.length > 0 ? (
        <ul className="dark:bg-neutral-600 bg-neutral-200 rounded p-1 max-h-96 overflow-y-auto divide-y-2 dark:divide-neutral-500 divide-neutral-400">
          {usersList.map(
            (user, i) =>
              user._id !== currentUser.id && <ChatUsersItem key={i} index={i} user={user} selectedUsers={selectedUsers} handleUser={handleUser} />
          )}
        </ul>
      ) : (
        <div className="dark:bg-neutral-700 bg-neutral-300 text-center py-10 dark:text-neutral-300 text-black text-xl rounded">No user found</div>
      )}
    </>
  );
}

export default SelectUserFromUsersList;
