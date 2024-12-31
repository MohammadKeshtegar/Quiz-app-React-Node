import { IoAttachOutline } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa6";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { IoSend } from "react-icons/io5";
// import io from "socket.io-client";

// import { ENDPOINT } from "../../constant/constant";
import ChatButtons from "../../ui/ChatButtons";
import { useChat } from "../../context/Chat";
import { useGetChat } from "./useGetChat";
import Message from "../../ui/Message";
import Spinner from "../../ui/Spinner";

function ChatMessage() {
  const { chatData } = useChat();
  const user = useSelector((state) => state.user);
  // const [user, setUser] = useState();
  // const [socketConnected, setSocketConnected] = useState(false);
  // const { handleSubmit, register } = useForm();
  const { isLoading, data } = useGetChat(chatData._id);

  // let socket, selectedChatCompare;

  // useEffect(function () {
  //   socket = io(ENDPOINT);
  //   socket.emit("setup", user);
  //   socket.on("connection", () => setSocketConnected(true));
  // }, []);

  if (isLoading && !data?.status)
    return (
      <div className="flex items-center justify-center w-full">
        <Spinner />
      </div>
    );
  const { data: selectedChatData } = data;

  console.log(selectedChatData);
  // function handleSendMessage(e) {
  //   e.preventDefault();
  // }

  return (
    <div className="w-full flex flex-col dark:bg-neutral-950 bg-neutral-100">
      <div className="w-full h-[calc(100vh-128.8px)] overflow-y-auto text-white p-3 flex flex-col gap-1 relative">
        {selectedChatData.messages.length > 0 ? (
          selectedChatData.messages.map((message) => (
            <Message maxWidth={"max-w-[500px]"} isSender={message.sender === user.id}>
              {message.message}
            </Message>
          ))
        ) : (
          <div className="text-neutral-600 text-center mt-80 text-2xl">No messages</div>
        )}
      </div>

      <div className="dark:bg-neutral-900 text-neutral-600 w-full border-t border-neutral-800 p-2 flex items-center gap-2">
        <div className="relative w-full">
          <input
            type="text"
            className="rounded-full dark:bg-neutral-700 bg-neutral-200 dark:text-neutral-300 text-black placeholder:text-neutral-500 px-5 py-3 focus:border-none focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
            placeholder="Write a message"
          />

          <button
            type="submit"
            className="absolute right-1 bg-blue-500 -translate-y-1/2 top-1/2 text-xl rounded-full p-2.5 hover:cursor-pointer hover:bg-blue-400 transition-all"
          >
            <IoSend className="text-white" />
          </button>
        </div>

        <ChatButtons icon={<IoAttachOutline className="rotate-45 text-3xl" />} />
        <ChatButtons icon={<FaMicrophone className="text-2xl" />} />
      </div>
    </div>
  );
}

export default ChatMessage;
