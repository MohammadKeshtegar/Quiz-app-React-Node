import { useState } from "react";

import ChatMessaging from "./ChatMessaging";
import ChatSidebar from "./ChatSidebar";
import FirstPage from "./FirstPage";

// const socket = io(ENDPOINT);

function ChatLayout() {
  const [chatId, setChatId] = useState(null);

  return (
    <div className="flex w-full relative h-full">
      <ChatSidebar setChatId={setChatId} />
      {!chatId ? <FirstPage /> : <ChatMessaging chatId={chatId} />}
    </div>
  );
}

export default ChatLayout;
