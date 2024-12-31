function Message({ children, isSender, maxWidth }) {
  return (
    <p
      className={`${isSender ? "bg-blue-600" : "dark:bg-neutral-600 bg-neutral-600"} px-3 py-2 rounded-xl ${maxWidth} text-wrap ${
        isSender ? "self-end" : "self-start"
      }`}
    >
      {children}
    </p>
  );
}

export default Message;
