export default function InboxMessageChatInvite({ inbox, username }) {
  return (
    <div className="py-2 px-4 rounded border-l-4 border-blue-600 dark:bg-neutral-700/60 bg-blue-500/10">
      <h2 className="font-semibold text-xl mb-5 dark:text-neutral-300/90 text-blue-500/80">Dear {username}</h2>
      <p className="dark:text-neutral-300/70 text-blue-500/80 mb-3">{inbox.message}</p>
    </div>
  );
}
