import { useState } from "react";

export default function ChatUsersItem({ index, username, userPhoto, userID, selectedUsers, setSelectedUsers }) {
  const defaultPhoto = userPhoto?.includes("default");
  const [isChecked, setIsChecked] = useState(false);

  function handleChatUsers() {
    setIsChecked((prev) => !prev);
    if (selectedUsers.length > 0 && selectedUsers.includes(userID)) {
      setSelectedUsers((userIds) => userIds.filter((userId) => userId !== userID));
    } else {
      setSelectedUsers((prevUsers) => [...prevUsers, userID]);
    }
  }

  return (
    <li
      className="flex items-center gap-7 px-4 py-3 dark:hover:bg-neutral-700 hover:cursor-pointer hover:bg-neutral-100 transition-all"
      onClick={handleChatUsers}
    >
      <div
        htmlFor={`id-of-the-user-${index}`}
        className={`w-5 h-5 rounded-full ring ring-blue-500 dark:ring-offset-neutral-600 ring-offset-neutral-200 ring-offset-2 ${
          isChecked ? "dark:bg-blue-500 bg-blue-500" : "dark:bg-neutral-600"
        } transition-all hover:cursor-pointer`}
      ></div>
      <img
        src={!defaultPhoto ? `http://127.0.0.1:5000/public/images/users/${userPhoto}` : "/default-user.png"}
        alt=""
        className="w-16 rounded-full"
      />
      <p className="text-xl font-semibold">{username}</p>
    </li>
  );
}
