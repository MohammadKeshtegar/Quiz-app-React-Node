import { IoAttachOutline } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";
import { Form } from "react-router-dom";

import { useChatStorage, useUserStorage } from "../../states/store";
import { useSocket } from "../../context/Socket";
import ChatButtons from "../../ui/ChatButtons";

export default function ChatMessageBar({ user }) {
  const { register, handleSubmit, setValue } = useForm();
  const { chat } = useChatStorage();
  const { user: currentUser } = useUserStorage();
  const socket = useSocket();

  const isChatMember = chat.members.includes(currentUser._id) || chat.admin === currentUser._id;

  async function onSubmitMessage(formData) {
    if (formData.message.lenght === 0) return;
    socket.emit("send-message-chat", { sender: user._id, message: formData.message, chat: chat.id });
    setValue("message", "");
  }

  return (
    <div className="dark:bg-neutral-900 text-neutral-600 w-full border-t border-neutral-800 p-2 flex items-center gap-2">
      {isChatMember ? (
        <>
          <Form className="relative w-full" onSubmit={handleSubmit(onSubmitMessage)}>
            <input
              type="text"
              className="rounded-full dark:bg-neutral-700 bg-neutral-200 dark:text-neutral-300 text-black placeholder:text-neutral-500 px-5 py-3 focus:border-none focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
              placeholder="Write a message"
              {...register("message")}
            />

            <button
              type="submit"
              className="absolute right-1 bg-blue-500 -translate-y-1/2 top-1/2 text-xl rounded-full p-2.5 hover:cursor-pointer hover:bg-blue-400 transition-all"
            >
              <IoSend className="text-white" />
            </button>
          </Form>

          <ChatButtons icon={<IoAttachOutline className="rotate-45 text-3xl" />} />
          <ChatButtons icon={<FaMicrophone className="text-2xl" />} />
        </>
      ) : (
        <div className="w-full h-full p-3 text-center font-bold capitalize">Join this chat to start messaging!</div>
      )}
    </div>
  );
}
