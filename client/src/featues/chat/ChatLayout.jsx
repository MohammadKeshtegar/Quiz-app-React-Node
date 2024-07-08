import { useState } from "react";

import { useGetAllChats } from "./useGetAllChats";
import ChatMessaging from "./ChatMessaging";
import ChatSidebar from "./ChatSidebar";
import Spinner from "../../ui/Spinner";
import FirstPage from "./FirstPage";

// const socket = io(ENDPOINT);

function ChatLayout() {
  const [chatId, setChatId] = useState(null);
  const [chat, setChat] = useState({});
  const { isLoading, data } = useGetAllChats();

  if (isLoading) return <Spinner />;
  const { data: chats } = data;

  return (
    <div className="flex w-full relative h-full">
      <ChatSidebar chats={chats} chatId={chatId} setChat={setChat} setChatId={setChatId} />
      {!chatId ? <FirstPage /> : <ChatMessaging chat={chat} chatId={chatId} />}
    </div>
  );
}

export default ChatLayout;
