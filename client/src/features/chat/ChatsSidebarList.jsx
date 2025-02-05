import { useGetAllChats } from "./useGetAllChats";
import ChatSideBarItem from "./ChatSidebarItem";
import Spinner from "../../ui/Spinner";

export default function ChatsSidebarList() {
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
        chats.map((chat) => <ChatSideBarItem key={chat._id} groupName={chat.name} chatData={chat} />)
      ) : (
        <div className="w-full flex justify-center pt-20 text-neutral-500 text-lg">No chat found!😢</div>
      )}
    </ul>
  );
}
