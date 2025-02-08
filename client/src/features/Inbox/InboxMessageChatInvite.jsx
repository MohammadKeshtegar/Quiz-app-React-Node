export default function InboxMessageChatInvite({ inbox, username }) {
  return (
    <div className="py-2 px-4 rounded border-l-4 border-blue-600 dark:bg-neutral-700/60 bg-blue-500/10">
      <h2 className="font-semibold text-xl mb-5 dark:text-neutral-300/90 text-blue-500/80">Dear {username}</h2>
      <p className="dark:text-neutral-300/70 text-blue-500/80 mb-3">
        We are thrilled to invite you to become a part of our {inbox.chatGroupName}. As a member, you’ll have the opportunity to connect with
        like-minded individuals, share ideas, and collaborate on exciting projects.
        <br />
        To accept this invitation, simply reply to this email or visit our group page at [Group URL]. We look forward to having you on board!
      </p>
    </div>
  );
}
