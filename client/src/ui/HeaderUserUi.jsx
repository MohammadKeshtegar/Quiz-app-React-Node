import { FaUserCircle } from "react-icons/fa";
import UserPhoto from "./UserPhoto";

function HeaderUserUi({ photo, username }) {
  return (
    <div className="flex items-center gap-3 dark:hover:bg-neutral-600 hover:bg-neutral-200 dark:text-white text-black rounded p-2 transition-all">
      {!photo.startsWith("/default") ? <UserPhoto photo={photo} photoStyles="w-8 rounded-full" /> : <FaUserCircle className="text-2xl" />}
      {username}
    </div>
  );
}

export default HeaderUserUi;
