import { useGetUserChats } from "../chat/useGetUserChats";
import ChatSideBarItem from "../chat/ChatSidebarItem";
import { useState } from "react";

import AdminChatMessagin from "./AdminChatMessagin";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";

function AdminMiniChat({ user }) {
  const [selectedChat, setSelectedChat] = useState(null);
  const { isLoading, data } = useGetUserChats(user.chatGroups);

  if (isLoading) return <Spinner />;
  const { data: userChatData } = data;

  return (
    <div className="dark:bg-neutral-800 bg-neutral-200 w-full rounded overflow-hidden dark:text-neutral-500 text-black flex h-[516px] shadow-custom-2">
      <div className="w-1/2 border-r border-blue-500 dark:bg-neutral-900/30 bg-neutral-100 overflow-y-auto">
        {user.chatGroups?.length > 0 ? (
          user.chatGroups.map((chat) => (
            <ChatSideBarItem userName="Jeff bezos" lastMessage="Hi bro, How are you going today?" chatID={chat._id} setChatId={setSelectedChat} />
          ))
        ) : (
          <div className="mt-40 mx-auto w-40 text-center flex flex-col items-center justify-center gap-2">
            <p>You have not joined any chat!</p>
            <Button styleType="fill">See Groups</Button>
          </div>
        )}
      </div>

      <div className="flex flex-col dark:bg-neutral-900/50 bg-neutral-100 w-full">
        {selectedChat ? (
          <AdminChatMessagin selectedChat={selectedChat} user={user} />
        ) : (
          <div className="w-full flex flex-col items-center mt-56">No chat selected</div>
        )}
      </div>
    </div>
  );
}

export default AdminMiniChat;
