export default function InboxMessageChatInvite({ inbox, username }) {
  return (
    <div className="py-2 px-4 rounded border-l-4 border-blue-600 bg-blue-500/10">
      <h2 className="font-semibold text-xl mb-5 dark:text-blue-400/90 text-blue-500/80">Dear {username}</h2>
      <p className="dark:text-blue-300/80 text-blue-500/90 mb-3">
        Hey {inbox.sender.username}, I'd love to connect and be friends! Accept my invitation to join my network
      </p>
    </div>
  );
}
