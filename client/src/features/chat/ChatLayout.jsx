import { useChatStorage } from "../../states/store";
import ChatMessaging from "./ChatMessaging";
import ChatSidebar from "./ChatSidebar";
import FirstPage from "./FirstPage";

function ChatLayout() {
  const { chat } = useChatStorage();

  return (
    <div className="flex w-full relative h-full">
      <ChatSidebar />
      {!chat.id ? <FirstPage /> : <ChatMessaging />}
    </div>
  );
}

export default ChatLayout;
