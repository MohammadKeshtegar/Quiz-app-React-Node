import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { FaTrashCan } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { IoMdEye } from "react-icons/io";
import { useState } from "react";

import { useDeleteChatGroup } from "./useDeleteChatGroup";
import ConfirmDelete from "../../ui/ConfirmDelete";
import ChatInfoForAdmin from "./ChatInfoForAdmin";
import GroupPicture from "../../ui/GroupPicture";
import ChatInfoForUser from "./ChatInfoForUser";
import Modal from "../../ui/Modal";

function ChatSideBarItem({ lastMessage, chatId, chat, setChatId, setChat }) {
  const [showMenu, setShowMenu] = useState("");
  const user = useSelector((state) => state.user);
  const isAdmin = user.id === chat.admin;
  const { isDeleting, deleteChatGroup } = useDeleteChatGroup();

  function handleDeleteChat() {
    setChatId("");
    deleteChatGroup(chatId);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  function handleShowMenu() {
    if (showMenu) {
      setShowMenu("");
    } else {
      setShowMenu(chatId);
    }
  }

  return (
    <li
      onClick={() => {
        setChatId(chat._id);
        setChat(chat);
      }}
      className={`flex items-center p-3 border-b border-neutral-600 hover:cursor-pointer dark:hover:bg-neutral-700/60 hover:bg-neutral-300 transition-all ${
        chat._id !== chatId ? "dark:bg-neutral-800/70 bg-neutral-300" : "dark:bg-neutral-700/60 bg-neutral-300"
      }`}
    >
      <div className="w-20">
        <GroupPicture chatPicture={chat.picture} pictureSize={"w-14 h-14"} />
      </div>

      <div className="overflow-hidden">
        <p className="font-semibold text-lg truncate mb-1">{chat.name}</p>
        <p className="text-xs text-neutral-500 truncate">{lastMessage}</p>
      </div>

      <div>
        <div className="rounded-full p-2 hover:bg-neutral-700 transition-all relative" onClick={handleShowMenu}>
          <BsThreeDotsVertical />
        </div>

        {showMenu === chatId && (
          <div className="absolute bg-neutral-800 p-1 rounded flex flex-col gap-1 z-40">
            <Modal>
              <Modal.Open>
                <div className="flex gap-2 items-center text-lg hover:bg-blue-500 rounded px-2 py-1 transition-all">
                  <IoMdEye /> Chat details
                </div>
              </Modal.Open>
              <Modal.Window>
                <ChatInfoForUser chat={chat} isAdmin={isAdmin} />
              </Modal.Window>
            </Modal>

            {isAdmin && (
              <Modal>
                <Modal.Open>
                  <div className="flex gap-2 items-center text-lg hover:bg-blue-500 rounded px-2 py-1 transition-all">
                    <IoMdSettings /> Edit chat
                  </div>
                </Modal.Open>
                <Modal.Window>
                  <ChatInfoForAdmin chat={chat} />
                </Modal.Window>
              </Modal>
            )}

            {isAdmin && (
              <Modal>
                <Modal.Open>
                  <div className="flex gap-2 items-center text-lg hover:bg-blue-500 rounded px-2 py-1 transition-all">
                    <FaTrashCan /> Delete chat
                  </div>
                </Modal.Open>
                <Modal.Window>
                  <ConfirmDelete onClick={handleDeleteChat} isLoading={isDeleting} source={"chat"} itemName={chat.name} />
                </Modal.Window>
              </Modal>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

export default ChatSideBarItem;
