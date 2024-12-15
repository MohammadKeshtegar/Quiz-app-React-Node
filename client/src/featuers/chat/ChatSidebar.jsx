import { FiPlusCircle } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

import ChatsSidebarList from "./ChatsSidebarList";
import CreateChatGroup from "./CreateChatGroup";
import Modal from "../../ui/Modal";

function ChatSidebar({ setChatId }) {
  const [chatData, setChatData] = useState({});
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="w-80 h-[calc(100vh-64px)] flex flex-col border-r border-blue-500 divide-y divide-neutral-700 dark:text-neutral-300 text-black dark:bg-neutral-900">
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
              <div className="p-3 hover:bg-blue-500 rounded-full hover:cursor-pointer transition-all hover:text-white">
                <FiPlusCircle />
              </div>
            </Modal.Open>
            <Modal.Window>
              <CreateChatGroup />
            </Modal.Window>
          </Modal>

          <div
            className="p-3 hover:bg-blue-500 rounded-full hover:cursor-pointer transition-all hover:text-white"
            onClick={() => setShowSearch((show) => !show)}
          >
            <FaSearch />
          </div>
        </div>
      </div>

      <ChatsSidebarList setChatId={setChatId} setChatData={setChatData} />
    </div>
  );
}

export default ChatSidebar;
