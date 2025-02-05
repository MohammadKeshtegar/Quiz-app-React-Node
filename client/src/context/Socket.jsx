import { createContext, useContext, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";

import { useChatStorage, useUserStorage } from "../states/store";
import { ENDPOINT } from "../constant/constant";

const SocketContext = createContext(null);

function SocketProvider({ children }) {
  const socket = useRef(null);
  const { user } = useUserStorage();
  const { chat, addMessage } = useChatStorage();
  const queryClient = useQueryClient();

  useEffect(
    function () {
      if (user._id && chat.id) {
        socket.current = io(ENDPOINT, {
          withCredentials: true,
          query: { userId: user._id },
        });

        socket.current.on("connect", () => {
          // console.log("Connected to socket server");
        });

        const handleRecieveMessageChannel = (message) => {
          addMessage(message);
          queryClient.invalidateQueries({ queryKey: ["messages", chat.id] });
        };

        socket.current.on("recieve-message-chat", handleRecieveMessageChannel);

        return () => {
          socket.current.disconnect();
        };
      }
    },
    [user._id, chat.id, addMessage, queryClient]
  );

  return <SocketContext.Provider value={socket.current}>{children}</SocketContext.Provider>;
}

function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) throw new Error("Socket context is used outside of the provider");
  return context;
}

export { useSocket, SocketProvider };
