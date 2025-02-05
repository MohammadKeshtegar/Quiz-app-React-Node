import { useUserStorage } from "../../states/store";
import ChatMessageBar from "./ChatMessageBar";

import ChatMessageContainer from "./ChatMessageContainer";

function ChatMessaging() {
  const { user } = useUserStorage();

  return (
    <div className="w-full flex flex-col dark:bg-neutral-950 bg-neutral-100">
      <ChatMessageContainer userID={user._id} />
      <ChatMessageBar user={user} />
    </div>
  );
}

export default ChatMessaging;
