import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { useSelector } from "react-redux";
import { IoMdEye } from "react-icons/io";

import GroupPicture from "../../ui/GroupPicture";
import ChatInfoForUser from "./ChatInfoForUser";
import Modal from "../../ui/Modal";
import Menu from "../../ui/Menu";
import ChatInfoForAdmin from "./ChatInfoForAdmin";

function ChatSideBarItem({ lastMessage, chatId, chat, setChatId, setChat }) {
  const user = useSelector((state) => state.user);

  return (
    <li
      onClick={() => {
        setChatId(chat._id);
        setChat(chat);
      }}
      className={`flex items-center p-3 border-b border-neutral-600 hover:cursor-pointer hover:bg-neutral-700/60 transition-all ${
        chat._id !== chatId ? "bg-neutral-800/70" : "bg-neutral-700/60"
      }`}
    >
      <div className="w-20">
        <GroupPicture chatPicture={chat.picture} pictureSize={"w-14 h-14"} />
      </div>
      <div className="overflow-hidden">
        <p className="font-semibold text-lg truncate mb-1">{chat.name}</p>
        <p className="text-xs text-neutral-500 truncate">{lastMessage}</p>
      </div>

      <Menu>
        <Menu.Toggle id={"chat-menu"}>
          <BsThreeDotsVertical />
        </Menu.Toggle>

        <Menu.List id={"chat-menu"}>
          <Modal>
            <Modal.Open opens={"chat-details"}>
              <Menu.Item icon={<IoMdEye />}>See chat details</Menu.Item>
            </Modal.Open>

            <Modal.Window>
              <ChatInfoForUser chat={chat} />
            </Modal.Window>
          </Modal>

          {/* {user.id === chat.admin && (
            <>
              <Modal.Open opens={"edit-chat"}>
                <Menu.Item icon={<IoMdSettings />}>Edit</Menu.Item>
              </Modal.Open>
              <Modal.Window name={"edit-chat"}>
                <ChatInfoForAdmin />
              </Modal.Window>
            </>
          )} */}
        </Menu.List>
      </Menu>
    </li>
  );
}

export default ChatSideBarItem;
