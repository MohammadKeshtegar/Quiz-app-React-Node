import { useGetInboxes } from "./useGetInboxes";
import Spinner from "../../ui/Spinner";
import InboxItem from "./InboxItem";

function Inbox() {
  const { isLoading, data } = useGetInboxes(true);

  if (isLoading) return <Spinner />;
  const { data: inboxes } = data;

  const sortedInboxes = inboxes.slice().sort((a, b) => {
    // Sort by read status (unread first)
    if (a.read !== b.read) {
      return a.read ? 1 : -1;
    }
    // If read status is the same, sort by date (newest first)
    return b.date - a.date;
  });

  return (
    <>
      {inboxes.length > 0 ? (
        <div className="w-full h-[calc(100vh-64px)] p-5 flex flex-col gap-3 overflow-y-auto">
          <div className="text-neutral-300 mr-0font-semibold text-xl">New 0</div>
          {sortedInboxes.map((inbox, i) => (
            <InboxItem key={i} inbox={inbox} />
          ))}
        </div>
      ) : (
        <div className="text-neutral-600 text-2xl font-semibold">No inboxes!</div>
      )}
    </>
  );
}

export default Inbox;
