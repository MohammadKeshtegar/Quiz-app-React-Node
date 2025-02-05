function Message({ message, isSender, maxWidth }) {
  const sendDateHour = new Date(message.createdAt).getHours();
  const sendDateMins = new Date(message.createdAt).getMinutes();

  return (
    <div className={`flex ${isSender ? "self-end" : "self-start"}`}>
      <img src={message.sender.photo} alt={``} />
      <div className={`${isSender ? "bg-blue-600" : "dark:bg-neutral-600 bg-neutral-600"} px-3 py-2 rounded-xl ${maxWidth} text-wrap `}>
        <div className="flex flex-col">
          <p>{message.message}</p>
          <span className="ml-auto text-neutral-400 text-sm">
            {sendDateHour}:{sendDateMins}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Message;
