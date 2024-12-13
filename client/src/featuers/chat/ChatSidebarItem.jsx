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
      className={`flex items-center gap-3 p-3 border-b border-neutral-600 hover:cursor-pointer hover:bg-neutral-700/60 transition-all ${
        chatId ? "bg-neutral-700/80" : "bg-neutral-800"
      }`}
    >
      <img src={userPicture ? `${userPicture}` : "/default-user.png"} alt="user-profile" className="w-14 rounded-full" />
      <div className="overflow-hidden">
        <p className="font-semibold text-lg truncate">{userName}</p>
        <p className="text-xs text-neutral-500 truncate">{lastMessage}</p>
      </div>
    </li>
  );
}

export default ChatSideBarItem;
