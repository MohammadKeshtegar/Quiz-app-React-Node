// import Spinner from "../../ui/Spinner";
// import { useGetChat } from "./useGetChat";

function ChatSideBarItem({ userName, lastMessage, userPicture, chatId, setChatId, setChatData }) {
  // const { isLoading, data } = useGetChat(chatId);

  // if (isLoading) return <Spinner />;
  // const { data: chatData } = data;
  // setChatData(chatData);

  return (
    <li
      onClick={() => setChatId(chatId)}
      className={`flex items-center gap-3 p-3 border-b border-neutral-600 hover:cursor-pointer dark:hover:bg-neutral-700/50 hover:bg-neutral-100 transition-all ${
        chatId ? "dark:bg-neutral-800/90" : "dark:bg-neutral-800 bg-neutral-200"
      }`}
    >
      <img src={userPicture ? `${userPicture}` : "/default-user.png"} alt="user-profile" className="w-14 rounded-full" />
      <div className="overflow-hidden">
        <p className="font-semibold text-lg truncate dark:text-neutral-400 text-black">{userName}</p>
        <p className="text-xs dark:text-neutral-500 text-neutral-600 truncate">{lastMessage}</p>
      </div>
    </li>
  );
}

export default ChatSideBarItem;
