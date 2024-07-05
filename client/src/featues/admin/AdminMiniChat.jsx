import { IoAttachOutline } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

import ChatSideBarItem from "../chat/ChatSidebarItem";
import ChatButtons from "../../ui/ChatButtons";
import Message from "../../ui/Message";

function AdminMiniChat() {
  return (
    <div className="bg-neutral-800 w-full rounded overflow-hidden text-neutral-500 flex h-[492px]">
      <div className="w-1/2 border-r border-blue-500 bg-neutral-900/30 overflow-y-auto">
        <ChatSideBarItem userName="Jeff bezos" lastMessage="Hi bro, How are you going today?" />
        <ChatSideBarItem userName="Jeff bezos" lastMessage="Hi bro, How are you going today?" />
        <ChatSideBarItem userName="Jeff bezos" lastMessage="Hi bro, How are you going today?" />
        <ChatSideBarItem userName="Jeff bezos" lastMessage="Hi bro, How are you going today?" />
        <ChatSideBarItem userName="Jeff bezos" lastMessage="Hi bro, How are you going today?" />
        <ChatSideBarItem userName="Jeff bezos" lastMessage="Hi bro, How are you going today?" />
        <ChatSideBarItem userName="Jeff bezos" lastMessage="Hi bro, How are you going today?" />
      </div>

      <div className="flex flex-col bg-neutral-900/50 w-full">
        <div className="flex-1 p-2 overflow-y-auto text-white flex flex-col gap-2 relative">
          {" "}
          <Message maxWidth={"max-w-[300px]"} userId={1} currentUserId={1}>
            How your project is going on?
          </Message>
          <Message maxWidth={"max-w-[300px]"} userId={1} currentUserId={2}>
            Not very well
          </Message>
          <Message maxWidth={"max-w-[300px]"} userId={1} currentUserId={2}>
            Not very well
          </Message>
          <Message maxWidth={"max-w-[300px]"} userId={1} currentUserId={2}>
            Not very well
          </Message>
          <Message maxWidth={"max-w-[300px]"} userId={1} currentUserId={1}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </Message>
          <Message maxWidth={"max-w-[300px]"} userId={1} currentUserId={2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </Message>
          <Message maxWidth={"max-w-[300px]"} userId={1} currentUserId={1}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </Message>
          <Message maxWidth={"max-w-[300px]"} userId={1} currentUserId={2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </Message>
        </div>
        <div className="bg-neutral-900 text-neutral-600 w-full border-neutral-800 p-2 flex items-center gap-2 border-r border-b">
          <div className="relative w-full">
            <input
              type="text"
              className="rounded-full bg-neutral-700 text-neutral-300 placeholder:text-neutral-500 px-5 py-3 focus:border-none focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
              placeholder="Write a message"
            />

            <button
              type="submit"
              className="absolute right-1 bg-blue-500 -translate-y-1/2 top-1/2 text-xl rounded-full p-2.5 hover:cursor-pointer hover:bg-blue-400 transition-all"
            >
              <IoSend className="text-white" />
            </button>
          </div>

          <ChatButtons icon={<FaMicrophone className="text-2xl" />} />
          <ChatButtons icon={<IoAttachOutline className="rotate-45 text-3xl" />} />
        </div>
      </div>
    </div>
  );
}

export default AdminMiniChat;
