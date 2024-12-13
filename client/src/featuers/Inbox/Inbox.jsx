import InboxItem from "./InboxItem";

function Inbox() {
  const inboxes = [1];

  return (
    <>
      {inboxes.length > 0 ? (
        <div className="w-full h-[calc(100vh-64px)] p-5 flex flex-col gap-3 overflow-y-auto">
          <div className="text-neutral-300 mr-0font-semibold text-xl">New 0</div>
          <InboxItem />
          <InboxItem />
          <InboxItem />
          <InboxItem />
          <InboxItem />
          <InboxItem />
          <InboxItem />
          <InboxItem />
          <InboxItem />
          <InboxItem />
          <InboxItem />
          <InboxItem />
          <InboxItem />
        </div>
      ) : (
        <div className="text-neutral-600 text-2xl font-semibold">No inboxes!</div>
      )}
    </>
  );
}

export default Inbox;
