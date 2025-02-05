import { useEffect, useRef } from "react";

import { useGetAllMessages } from "./useGetAllMessages";
import { useChatStorage } from "../../states/store";
import Message from "../../ui/Message";
import Spinner from "../../ui/Spinner";

export default function ChatMessageContainer({ userID, socket }) {
  const { chat, setSelectedChatMessages } = useChatStorage();
  const { isLoading, data } = useGetAllMessages(chat.id);
  const scrollRef = useRef();

  useEffect(
    function () {
      if (data !== undefined && !isLoading) {
        setSelectedChatMessages(data.data);
      }
    },
    [data, setSelectedChatMessages, isLoading, chat.messages]
  );

  useEffect(
    function () {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
    },
    [chat.messages]
  );

  if (isLoading && !data?.status)
    return (
      <div className="flex h-full items-center justify-center w-full">
        <Spinner />
      </div>
    );
  const { data: messages } = data;

  return (
    <>
      <div className="w-full h-[calc(100vh-128.8px)] overflow-y-auto text-white p-3 flex flex-col gap-1 relative">
        {messages.length > 0 ? (
          messages.map((message) => <Message key={message._id} maxWidth={"max-w-[500px]"} isSender={message.sender === userID} message={message} />)
        ) : (
          <div className="text-neutral-600 text-center mt-80 text-2xl">No messages</div>
        )}
        <div ref={scrollRef} />
      </div>
    </>
  );
}
