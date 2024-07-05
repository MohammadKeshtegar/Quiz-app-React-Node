import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { RiListSettingsLine } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { LuClipboardCheck } from "react-icons/lu";
import { MdSpaceDashboard } from "react-icons/md";
import { IoMdChatbubbles } from "react-icons/io";
import { PiUserList } from "react-icons/pi";
import { LuUsers2 } from "react-icons/lu";
import { useSelector } from "react-redux";
import { FaInbox } from "react-icons/fa";
import SidebarItem from "./SidebarItem";

function IconSiderbar() {
  const userLinks = [
    { icon: <MdSpaceDashboard />, path: "/user/dashboard" },
    { icon: <PiUserList />, path: "/user/quiz" },
    { icon: <MdOutlinePlaylistAddCheck />, path: "/user/confirmed-quizzes" },
    { icon: <LuUsers2 />, path: "/players" },
    { icon: <LuClipboardCheck />, path: "quiz/quiz-list" },
    { icon: <IoMdChatbubbles />, path: "/chats" },
  ];
  const adminLinks = [
    { icon: <MdSpaceDashboard />, path: "/admin/dashboard" },
    { icon: <RiListSettingsLine />, path: "/admin/manage-quizzes" },
    { icon: <MdManageAccounts />, path: "/admin/manage-users" },
    { icon: <IoMdChatbubbles />, path: "/chats" },
    { icon: <FaInbox />, path: "/inbox" },
  ];

  const user = useSelector((state) => state.user);

  return (
    <div className="min-h-[calc(100vh-64px)] flex text-neutral-300 dark:bg-neutral-900">
      <div className="border-r border-blue-500 divide-y px-2 divide-neutral-700">
        {user && user.role === "user" ? (
          <div>
            <ul className="flex flex-col gap-2 pt-1 pb-2">
              {userLinks.map((link) => (
                <SidebarItem key={link.path} text={link.icon} isIcon={true} path={link.path} />
              ))}
            </ul>
          </div>
        ) : (
          <ul className="py-2 flex flex-col gap-2">
            {adminLinks.map((link) => (
              <SidebarItem key={link.path} text={link.icon} isIcon={true} path={link.path} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default IconSiderbar;
