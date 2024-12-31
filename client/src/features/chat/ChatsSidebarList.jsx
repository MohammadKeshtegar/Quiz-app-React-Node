import { useGetAllChats } from "./useGetAllChats";
import ChatSideBarItem from "./ChatSidebarItem";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";

export default function ChatsSidebarList() {
  const { isLoading, data } = useGetAllChats();
  const [chats, setChats] = useState([]);

  // Prevent from setting the selected chat data for chatsData, still don't have any idea what this happends
  useEffect(
    function () {
      if (data && data.data.length > 0 && !isLoading) {
        setChats(data.data);
      }
    },
    [data, isLoading]
  );

  if (isLoading)
    return (
      <div className="flex justify-center pt-20">
        <Spinner />
      </div>
    );

  return (
    <ul className="overflow-y-auto">
      {chats.length > 0 ? (
        chats.map((chat) => (
          <ChatSideBarItem key={chat._id} userName="Jeff bezos" lastMessage="Hi bro, How are you going today?" chat={chat} />
        ))
      ) : (
        <div className="w-full flex justify-center pt-20 text-neutral-500 text-lg">No chat found!😢</div>
      )}
    </ul>
  );
}
