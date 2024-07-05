import { useState } from "react";

import { useGetAllChats } from "./useGetAllChats";
import ChatMessaging from "./ChatMessaging";
import ChatSidebar from "./ChatSidebar";
import Spinner from "../../ui/Spinner";
import FirstPage from "./FirstPage";

// const socket = io(ENDPOINT);

function ChatLayout() {
  const { isLoading, data } = useGetAllChats();
  const [chatId, setChatId] = useState(null);

  if (isLoading) return <Spinner />;
  console.log(data);
  const { data: chats } = data;

  return (
    <div className="flex w-full relative h-full">
      <ChatSidebar chats={chats} setChatId={setChatId} />
      {!chatId ? <FirstPage /> : <ChatMessaging chatId={chatId} />}
    </div>
  );
}

export default ChatLayout;
