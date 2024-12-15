import ChatSideBarItem from "./ChatSidebarItem";
import Spinner from "../../ui/Spinner";
import { useGetAllChats } from "./useGetAllChats";

export default function ChatsSidebarList({ setChatId, setChatData }) {
  const { isLoading, data } = useGetAllChats();

  if (isLoading)
    return (
      <div className="flex justify-center pt-20">
        <Spinner />
      </div>
    );
  const { data: chats } = data;

  return (
    <ul className="overflow-y-auto">
      {chats.length > 0 ? (
        chats.map((chat) => (
          <ChatSideBarItem
            userName="Jeff bezos"
            lastMessage="Hi bro, How are you going today?"
            chatId={chat._id}
            setChatId={setChatId}
            setChatData={setChatData}
          />
        ))
      ) : (
        <div className="w-full flex justify-center pt-20 text-neutral-500 text-lg">No chat found!😢</div>
      )}
    </ul>
  );
}
