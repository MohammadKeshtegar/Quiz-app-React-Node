import { FiPlusCircle } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";

import ChatsSidebarList from "./ChatsSidebarList";
import CreateChatGroup from "./CreateChatGroup";
import SeacrhChat from "./SeachChat";
import Modal from "../../ui/Modal";

function ChatSidebar() {
  return (
    <div className="w-80 h-[calc(100vh-64px)] flex flex-col border-r border-blue-500 divide-y divide-neutral-700 dark:text-neutral-300 text-black dark:bg-neutral-900">
      <div className="flex border-b border-blue-500">
        <div className="flex items-center gap-1 w-full p-2 text-lg">
          <Modal>
            <Modal.Open opens="create-chat-group">
              <div className="p-3 hover:bg-blue-500 rounded-full hover:cursor-pointer transition-all hover:text-white">
                <FiPlusCircle />
              </div>
            </Modal.Open>
            <Modal.Window name="create-chat-group">
              <CreateChatGroup />
            </Modal.Window>

            <Modal.Open opens="search-chat">
              <div className="p-3 hover:bg-blue-500 rounded-full hover:cursor-pointer transition-all hover:text-white">
                <FaSearch />
              </div>
            </Modal.Open>
            <Modal.Window name="search-chat">
              <SeacrhChat />
            </Modal.Window>
          </Modal>
        </div>
      </div>

      <ChatsSidebarList />
    </div>
  );
}

export default ChatSidebar;
