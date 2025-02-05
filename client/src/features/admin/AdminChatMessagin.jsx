import { IoAttachOutline } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

import ChatButtons from "../../ui/ChatButtons";
import Message from "../../ui/Message";

export default function AdminChatMessagin({ selectedChat, user }) {
  return (
    <>
      {selectedChat.message.length > 0 ? (
        <div className="flex-1 p-2 overflow-y-auto text-white flex flex-col gap-2 relative">
          {selectedChat.messages.map((message) => (
            <Message maxWidth={"max-w-[300px]"} isSender={user.id === message.sender}>
              {message.message}
            </Message>
          ))}
        </div>
      ) : (
        <div>NO message</div>
      )}
      <div className="dark:bg-neutral-900 bg-white dark:shadow-none text-neutral-600 w-full dark:border-neutral-800 border-none p-2 flex items-center gap-2 border-r border-b ">
        <div className="relative w-full">
          <input
            type="text"
            className="rounded-full dark:bg-neutral-700 bg-neutral-100 text-neutral-300 placeholder:text-neutral-500 px-5 py-3 focus:border-none focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
            placeholder="Write a message"
          />

          <button
            type="submit"
            className="absolute right-1 bg-blue-500 -translate-y-1/2 top-1/2 text-xl rounded-full p-2.5 hover:cursor-pointer hover:bg-blue-400 transition-all"
          >
            <IoSend className="text-white" />
          </button>
        </div>

        <ChatButtons icon={<FaMicrophone className="text-2xl" />} />
        <ChatButtons icon={<IoAttachOutline className="rotate-45 text-3xl" />} />
      </div>
    </>
  );
}
