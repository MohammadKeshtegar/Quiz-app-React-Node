import { useNavigate } from "react-router-dom";
import { useSetInboxRead } from "./useSetInboxRead";
import { useUserStorage } from "../../states/store";

function InboxItem({ inbox }) {
  const navigate = useNavigate();
  const { setReadInbox } = useSetInboxRead();
  const { user } = useUserStorage();

  let messageType;
  switch (inbox.messageType) {
    case "chat-invite":
      if (user._id === inbox.sender._id) messageType = `You asked ${inbox.reciever.username} to join ${inbox.chatGroupName}`;
      else messageType = `${inbox.sender.username} asked you to join ${inbox.chatGroupName}`;
      break;
    case "friend-invite":
      if (user._id === inbox.sender._id) messageType = `You asked ${inbox.reciever.username} to be friends`;
      else messageType = `${inbox.sender.username} asked you to be friends`;
      break;
    case "custom":
      messageType = `${inbox.message.slice(0, 20)}`;
      break;
    default:
      break;
  }

  function handleClick() {
    if (inbox.sender._id !== user._id) setReadInbox({ inboxID: inbox._id, newData: { read: true } });
    navigate(`/inbox/${inbox._id}`);
  }

  return (
    <div
      className={`flex items-center gap-5 dark:bg-neutral-800 border-l-4 border-blue-600 w-full px-6 py-4 ${
        !inbox.read ? "dark:text-neutral-300 text-black" : "dark:text-neutral-500 text-neutral-400"
      } rounded text-xl font-semibold dark:hover:bg-neutral-700 hover:bg-neutral-100 transition-all hover:cursor-pointer shadow-custom-1`}
      onClick={handleClick}
    >
      <div className="truncate w-40">{inbox.sender.username}</div>
      <div className="truncate max-w-[700px]">{messageType}</div>
      <div className="ml-auto dark:text-neutral-500 text-neutral-400 flex items-center gap3">{new Date(inbox.createdAt).toLocaleDateString()}</div>
    </div>
  );
}

export default InboxItem;
