import { Link } from "react-router-dom";
import { format } from "date-fns";

function InboxItem({ inbox, isSender }) {
  let message;
  switch (inbox.messageType) {
    case "invite chat":
      if (isSender) message = `You asked ${inbox.reciever.username} to join to a chat`;
      else message = "Asked you to join to a chat";
      break;
    case "invite as friend":
      if (isSender) message = `You've sent a friendship request to ${inbox.reciever.username}`;
      else message = "Send you a friendship request";
      break;
    default:
      message = "";
      break;
  }

  return (
    <div className="bg-neutral-800 border-l-4 border-blue-600 w-full px-6 py-4 text-neutral-300 rounded text-xl font-semibold hover:bg-neutral-700 transition-all hover:cursor-pointer">
      <Link to={inbox._id} state={{ inbox }} className="flex items-center gap-5">
        <div className={`truncate w-60 ${inbox.read && "text-neutral-500"}`}>
          {isSender ? `to ${inbox.reciever.username}` : `from ${inbox.sender.username}`}
        </div>

        <div className={`truncate max-w-[700px] ${inbox.read && "text-neutral-500"}`}>{message}</div>

        {!inbox.read && (
          <div className="text-xs border border-blue-500 rounded-sm px-2 py-1 text-blue-500 font-semibold -tracking-tighter ml-auto">NEW</div>
        )}

        <div className="ml-auto text-neutral-500 flex items-center gap3">{format(new Date(inbox.createdAt), "yyyy/MM/dd")}</div>
      </Link>
    </div>
  );
}

export default InboxItem;
