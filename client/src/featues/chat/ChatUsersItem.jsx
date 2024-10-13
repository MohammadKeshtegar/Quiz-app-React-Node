import { CgClose } from "react-icons/cg";

function ChatUsersItem({ user, selectedUsers, handleUser }) {
  const defaultPhoto = user.photo?.includes("default");

  return (
    <li
      className="flex items-center justify-between px-4 py-3 cursor-pointer dark:hover:bg-neutral-700 hover:bg-neutral-400 transition-all"
      onClick={() => handleUser(user._id)}
    >
      <div className="flex items-center gap-5">
        <div
          className={`w-7 h-7 border-none rounded-full outline-none ring ring-offset-2 dark:ring-offset-neutral-600 ring-offset-neutral-300 ring-blue-500 ${
            selectedUsers.includes(user._id) ? "bg-blue-500" : "dark:bg-neutral-600 bg-neutral-300"
          } `}
        ></div>

        <div className="flex items-center gap-5">
          <img
            src={!defaultPhoto ? `http://127.0.0.1:5000/public/images/users/${user.photo}` : "/default-user.png"}
            alt=""
            className="w-16 rounded-full"
          />
          <p className="text-xl font-semibold">{user.username}</p>
        </div>
      </div>
    </li>
  );
}

export default ChatUsersItem;
