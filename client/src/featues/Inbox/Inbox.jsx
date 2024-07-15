import { useSelector } from "react-redux";

import { useGetInboxes } from "./useGetInboxes";
import Spinner from "../../ui/Spinner";
import InboxItem from "./InboxItem";

function Inbox() {
  const { isLoading, data } = useGetInboxes(true);
  const user = useSelector((state) => state.user);

  if (isLoading) return <Spinner />;
  const { data: inboxes } = data;

  const sortedInboxes = inboxes.slice().sort((a, b) => {
    // Sort by read status (unread first)
    if (a.read !== b.read) {
      return a.read ? 1 : -1;
    }
    // If read status is the same, sort by date (newest first)
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <>
      {inboxes.length > 0 ? (
        <div className="w-full h-[calc(100vh-64px)] p-5 flex flex-col gap-3 overflow-y-auto">
          {sortedInboxes.map((inbox, i) => (
            <InboxItem key={i} inbox={inbox} isSender={user.id === inbox.sender._id} />
          ))}
        </div>
      ) : (
        <div className="text-neutral-600 text-2xl font-semibold">No inboxes!</div>
      )}
    </>
  );
}

export default Inbox;
