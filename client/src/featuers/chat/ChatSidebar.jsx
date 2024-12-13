import { FiPlusCircle } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

import { useGetAllChats } from "./useGetAllChats";
import ChatSideBarItem from "./ChatSidebarItem";
import CreateChatGroup from "./CreateChatGroup";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";

function ChatSidebar({ setChatId }) {
  const [chatData, setChatData] = useState({});
  const [showSearch, setShowSearch] = useState(false);
  const { isLoading, data } = useGetAllChats();

  if (isLoading) return <Spinner />;
  const { data: chats } = data;
  return (
    <div className="w-80 h-[calc(100vh-64px)] flex flex-col border-r border-blue-500 divide-y divide-neutral-700 text-neutral-300 dark:bg-neutral-900">
      <div className="flex border-b border-neutral-400">
        {showSearch && (
          <input
            type="text"
            placeholder="Search chat"
            className="bg-neutral-800 placeholder:text-neutral-600 px-4 py-3 text-lg focus:outline-none absolute rounded border focus:border-blue-600 w-96 border-neutral-600 z-30 top-20 left-1/2 -translate-x-1/2"
          />
        )}

        <div className="flex items-center gap-1 w-full p-2 text-lg">
          <Modal>
            <Modal.Open>
              <div className="p-3 hover:bg-blue-500 rounded-full hover:cursor-pointer transition-all">
                <FiPlusCircle />
              </div>
            </Modal.Open>
            <Modal.Window>
              <CreateChatGroup />
            </Modal.Window>
          </Modal>

          <div
            className="p-3 hover:bg-blue-500 rounded-full hover:cursor-pointer transition-all"
            onClick={() => setShowSearch((show) => !show)}
          >
            <FaSearch />
          </div>
        </div>
      </div>

      <ul className="overflow-y-auto">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <ChatSideBarItem
              userName="Jeff bezos"
              lastMessage="Hi bro, How are you going today?"
              chatId={chat._id}
              setChatId={setChatId}
              setChatData={setChatData}
            />
          ))
        ) : (
          <div className="w-full flex justify-center pt-20 text-neutral-500 text-lg">No chat found!😢</div>
        )}
      </ul>
    </div>
  );
}

export default ChatSidebar;
