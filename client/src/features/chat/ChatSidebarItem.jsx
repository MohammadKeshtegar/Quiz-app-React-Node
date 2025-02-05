import { BsThreeDotsVertical } from "react-icons/bs";
import { useChatStorage } from "../../states/store";
import { useRef } from "react";
import Modal from "../../ui/Modal";
import ChatInfo from "./ChatInfo";

function ChatSideBarItem({ groupName, userPicture, chatData }) {
  const infoButtonRef = useRef(null);
  const { chat, setSelectedChatData } = useChatStorage();

  function handleSelectChat(e, chatData) {
    if (infoButtonRef.current && infoButtonRef.current.contains(e.target)) return;
    else setSelectedChatData(chatData);
  }

  return (
    <li
      onClick={(e) => handleSelectChat(e, chatData)}
      className={`flex w-full items-center gap-3 p-3 border-b border-neutral-600 hover:cursor-pointer dark:hover:bg-neutral-700/50 hover:bg-neutral-100 transition-all ${
        chatData._id === chat.id ? "dark:bg-neutral-700/80" : "dark:bg-neutral-800 bg-neutral-200"
      }`}
    >
      <img src={userPicture ? `${userPicture}` : "/default-user.png"} alt="user-profile" className="w-14 rounded-full" />
      <div className="overflow-hidden">
        <p className="font-semibold text-lg truncate dark:text-neutral-400 text-black">{groupName}</p>
      </div>

      <div className="ml-auto p-2 rounded-full hover:bg-neutral-600 transition-all" ref={infoButtonRef}>
        <Modal>
          <Modal.Open opens="chat-info">
            <BsThreeDotsVertical />
          </Modal.Open>
          <Modal.Window name="chat-info">
            <ChatInfo chatID={chatData._id} />
          </Modal.Window>
        </Modal>
      </div>
    </li>
  );
}

export default ChatSideBarItem;
