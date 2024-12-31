import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

function ChatProvider({ children }) {
  const [chatData, setChatData] = useState(null);

  return <ChatContext.Provider value={{ chatData, setChatData }}>{children}</ChatContext.Provider>;
}

function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) throw new Error("Chat context is used outside of the provider!");
  return context;
}

export { useChat, ChatProvider };
