function ChatUsersItem({ index, userId, setUsers }) {
  function handleClick() {}

  return (
    <li className="flex items-center gap-5 px-4 py-3 group dark:hover:bg-neutral-700 hover:cursor-pointer hover:bg-neutral-100 transition-all">
      <input type="checkbox" name={`id-of-the-user-${index}`} id={`id-of-the-user-${index}`} className="hidden peer" />
      <label
        htmlFor={`id-of-the-user-${index}`}
        className="w-5 h-5 dark:bg-neutral-600 bg-neutral-200 rounded-full ring ring-blue-500 dark:ring-offset-neutral-600 ring-offset-neutral-200 ring-offset-2 peer-checked:bg-blue-500 group-checked:bg-blue-500 transition-all hover:cursor-pointer"
        onClick={handleClick}
      ></label>
      <div className="flex items-center gap-5">
        <img src="/default-user.png" alt="" className="w-16 rounded-full" />
        <p className="text-xl font-semibold">username</p>
      </div>
    </li>
  );
}

export default ChatUsersItem;
