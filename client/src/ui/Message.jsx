function Message({ message, userId, maxWidth = null }) {
  return (
    <p
      className={`${userId === message.sender ? "bg-blue-600" : "bg-neutral-600"} px-3 py-2 rounded-lg ${maxWidth || "max-w-[500px]"} text-wrap ${
        userId === message.sender ? "self-end" : "self-start"
      }`}
    >
      {message.message}
    </p>
  );
}

export default Message;
