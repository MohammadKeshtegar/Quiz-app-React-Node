import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { IoAttachOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { IoSend } from "react-icons/io5";
import { Form } from "react-router-dom";
import io from "socket.io-client";

import { useCreateMessage } from "./useCreateMessage";
import { ENDPOINT } from "../../constant/constant";
import ChatButtons from "../../ui/ChatButtons";
import MiniSpinner from "../../ui/MiniSpinner";
import { useGetChat } from "./useGetChat";
import Message from "../../ui/Message";
import Spinner from "../../ui/Spinner";

// Note to put this line out of the Component, because each time the component rerenders, the socket
let socket, selectedChatCompare;

function ChatMessage({ chat, chatId }) {
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const user = useSelector((state) => state.user);
  const messageContainer = useRef(null);
  const queryClient = useQueryClient();

  const { handleSubmit, register, reset } = useForm();
  const { isLoading, data } = useGetChat(chatId);
  const { isCreating, createMessage } = useCreateMessage(chatId);

  useEffect(function () {}, []);

  useEffect(
    function () {
      socket = io(ENDPOINT);
      socket.emit("setup", user);
      socket.on("connected", () => setSocketConnected(true));
      socket.on("typing", () => setIsTyping(true));
      socket.on("stop-typing", () => setIsTyping(false));
    },
    [user]
  );

  useEffect(
    function () {
      socket.emit("join-chat", chatId);
    },
    [isLoading, chatId]
  );

  useEffect(
    function () {
      selectedChatCompare = chat;
    },
    [chat]
  );

  useEffect(function () {
    socket.on("message-received", () => {
      if (!selectedChatCompare) {
      } else {
        queryClient.invalidateQueries({
          queryClient: ["chat", chatId],
        });
      }
    });
  });

  useEffect(
    function () {
      // messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
      if (messageContainer.current) {
        setTimeout(() => {
          messageContainer.current.scroll({
            top: messageContainer.current.scrollHeight,
            behavior: "smooth",
          });
        }, 100);
      }
    },
    [messageContainer?.current?.scrollHeight, data?.data?.messages]
  );

  if (isLoading) return <Spinner />;
  const { data: fetchedChat } = data;

  function handleTyping() {
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", chatId);
    }

    const timeToStopTyping = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const leftTime = timeNow - timeToStopTyping;

      if (leftTime >= timerLength && typing) {
        socket.emit("stop-typing", chatId);
        setTyping(false);
      }
    }, timerLength);
  }

  function handleSendMessage(data) {
    createMessage(
      { ...data, sender: user.id, chatId },
      {
        onSuccess: (data) => {
          reset();
          socket.emit("new-message", data, chat);
        },
      }
    );
  }

  return (
    <div className="w-full flex flex-col bg-neutral-950">
      <div ref={messageContainer} className="w-full h-[calc(100vh-128.8px)] overflow-y-auto text-white p-3 flex flex-col gap-1 relative">
        {fetchedChat.messages.length > 0 ? (
          fetchedChat.messages.map((message, i) => <Message key={i} userId={user.id} message={message} />)
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-600">👋 Hello, send a message to start the chat</div>
        )}
      </div>

      <div className="bg-neutral-900 text-neutral-600 w-full border-t border-neutral-800 p-2 flex items-center gap-2">
        <Form onSubmit={handleSubmit(handleSendMessage)} className="relative w-full">
          {isTyping ? <div>typing...</div> : null}
          <input
            type="text"
            className="rounded-full bg-neutral-700 text-neutral-300 placeholder:text-neutral-500 px-5 py-3 focus:border-none focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
            placeholder="Write a message"
            {...register("message", { onChange: handleTyping })}
          />

          <button
            type="submit"
            className="absolute right-1 bg-blue-500 -translate-y-1/2 top-1/2 text-xl rounded-full p-2.5 hover:cursor-pointer hover:bg-blue-400 transition-all"
          >
            {isCreating ? <MiniSpinner /> : <IoSend className="text-white" />}
          </button>
        </Form>

        <ChatButtons icon={<IoAttachOutline className="rotate-45 text-3xl" />} />
      </div>
    </div>
  );
}

export default ChatMessage;
