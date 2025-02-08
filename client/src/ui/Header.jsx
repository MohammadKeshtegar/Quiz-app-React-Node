import { IoIosSunny } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useLogout } from "../features/authentication/useLogout";
import { useUserStorage } from "../states/store";
import { useMode } from "../context/Mode";
import HeaderUserUi from "./HeaderUserUi";
import ButtonLink from "./ButtonLink";
import Logo from "./Logo";

function Header() {
  const { changeMode, mode } = useMode();
  const { user } = useUserStorage();
  const { logout } = useLogout();

  return (
    <div className="w-full h-16 dark:bg-neutral-900 border-b border-blue-500 shadow-[0_15px_15px_-15px_rgba(29,78,216,0.5)] px-5 py-2 flex justify-between items-center text-white">
      <Link to="/">
        <Logo />
      </Link>

      <div className="flex items-center gap-3">
        <div
          className="p-2 rounded-full dark:bg-neutral-800 dark:text-white text-black border border-neutral-300 shadow-2xl dark:hover:bg-neutral-700 hover:bg-neutral-200 hover:cursor-pointer transition-all mr-3"
          onClick={changeMode}
        >
          {mode === "dark" ? <FaMoon /> : <IoIosSunny />}
        </div>

        {user?.email ? (
          <Link className="flex items-center gap-3" to={user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"} state={{ from: "/" }}>
            <HeaderUserUi photo={user.photo} username={user.username} />

            <div
              className="dark:hover:bg-neutral-700 hover:bg-neutral-200 dark:text-white text-black p-2 text-xl rounded transition-all cursor-pointer"
              onClick={logout}
            >
              <FiLogOut />
            </div>
          </Link>
        ) : (
          <div className="flex items-center gap-2 ml-auto">
            <ButtonLink url="/login" type="border">
              Login
            </ButtonLink>
            <ButtonLink url="/signup" styleType="fill">
              Sign up
            </ButtonLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
