function Message({ children, userId, currentUserId, maxWidth }) {
  return (
    <p
      className={`${userId === currentUserId ? "bg-blue-600" : "bg-neutral-600"} px-3 py-2 rounded-xl ${maxWidth} text-wrap ${
        userId === currentUserId ? "self-end" : "self-start"
      }`}
    >
      {children}
    </p>
  );
}

export default Message;
