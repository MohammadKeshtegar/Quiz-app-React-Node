import { useGetAllInbox } from "./useGetAllInbox";
import Spinner from "../../ui/Spinner";
import InboxItem from "./InboxItem";

function Inbox() {
  const { isLoading, data } = useGetAllInbox();

  if (isLoading) return <Spinner />;
  const { data: inboxes } = data;

  const unreadInboxes = inboxes.reduce((acc, cur) => (!cur.read ? acc + 1 : acc), 0);

  return (
    <>
      {inboxes.length > 0 ? (
        <div className="w-full h-[calc(100vh-64px)] p-5 flex flex-col gap-3 overflow-y-auto">
          <div className="dark:text-neutral-300 mr-0font-semibold text-xl">New {unreadInboxes}</div>

          {inboxes.map((inbox) => (
            <InboxItem key={inbox._id} inbox={inbox} />
          ))}
        </div>
      ) : (
        <div className="text-neutral-600 text-2xl font-semibold">No inboxes!</div>
      )}
    </>
  );
}

export default Inbox;
