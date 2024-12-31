import { ChatProvider, useChat } from "../../context/Chat";
import ChatMessaging from "./ChatMessaging";
import ChatSidebar from "./ChatSidebar";
import FirstPage from "./FirstPage";

// const socket = io(ENDPOINT);

function ChatLayout() {
  return (
    <ChatProvider>
      <div className="flex w-full relative h-full">
        <ChatSidebar />
        <ChatMainPage />
      </div>
    </ChatProvider>
  );
}

function ChatMainPage() {
  const { chatData } = useChat();
  return !chatData ? <FirstPage /> : <ChatMessaging />;
}

export default ChatLayout;
