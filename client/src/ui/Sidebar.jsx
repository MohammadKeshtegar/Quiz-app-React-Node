import { MdOutlinePlaylistAddCheck, MdSpaceDashboard, MdManageAccounts } from "react-icons/md";
import { LuClipboardCheck, LuUsers2 } from "react-icons/lu";
import { RiListSettingsLine } from "react-icons/ri";
import { IoMdChatbubbles } from "react-icons/io";
import { PiUserList } from "react-icons/pi";
import { useSelector } from "react-redux";
import { FaInbox } from "react-icons/fa";

import SidebarItem from "./SidebarItem";

function Sidebar() {
  const userLinks = [
    { name: "Dashboard", path: "/user/dashboard", icon: <MdSpaceDashboard /> },
    { name: "My Quiz", path: "/user/quiz", icon: <PiUserList /> },
    { name: "Confirmed Quizzes", path: "/user/confirmed-quizzes", icon: <MdOutlinePlaylistAddCheck /> },
    { name: "Players", path: "/players", icon: <LuUsers2 /> },
    { name: "Quizes", path: "quiz/quiz-list", icon: <LuClipboardCheck /> },
    { name: "Chats", path: "/chats", icon: <IoMdChatbubbles /> },
    { name: "Inbox", path: "/inbox", icon: <FaInbox /> },
  ];
  const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <MdSpaceDashboard /> },
    { name: "Managing Quiz", path: "/admin/manage-quizzes", icon: <RiListSettingsLine /> },
    { name: "Managing Users", path: "/admin/manage-users", icon: <MdManageAccounts /> },
    { name: "Chats", path: "/chats", icon: <IoMdChatbubbles /> },
    { name: "Inbox", path: "/inbox", icon: <FaInbox /> },
  ];
  const user = useSelector((state) => state.user);

  return (
    <div className="w-64 min-h-[calc(100vh-64px)] px-2 flex flex-col border-r border-blue-500 dark:text-neutral-300 text-black dark:bg-gradient-to-tl from-neutral-900 to-neutral-800">
      {user.email ? (
        user?.role === "user" ? (
          <ul className="flex flex-col gap-2 py-2">
            {userLinks.map((link) => (
              <SidebarItem key={link.name} text={link.name} path={link.path} icon={link.icon} />
            ))}
          </ul>
        ) : (
          <ul className="flex flex-col gap-2 py-2">
            {adminLinks.map((link) => (
              <SidebarItem key={link.name} text={link.name} path={link.path} icon={link.icon} />
            ))}
          </ul>
        )
      ) : null}
    </div>
  );
}

export default Sidebar;
