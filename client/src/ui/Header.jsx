import { IoIosSunny } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import { FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useLogout } from "../featues/authentication/useLogout";
import { useMode } from "../context/Mode";
import ButtonLink from "./ButtonLink";
import Logo from "./Logo";
import HeaderUserUi from "./HeaderUserUi";

function Header() {
  const user = useSelector((state) => state.user);
  const { logout } = useLogout();
  const { changeMode, mode } = useMode();
  const defaultPhoto = user.photo?.includes("default");

  return (
    <div className="w-full h-16 bg-neutral-900 border-b border-blue-500 shadow-[0_15px_15px_-15px_rgba(29,78,216,0.5)] px-5 py-2 flex justify-between items-center text-white">
      <Link to="/">
        <Logo />
      </Link>

      <div className="flex items-center gap-3">
        <div className="rounded-full bg-neutral-800 hover:bg-neutral-700 hover:cursor-pointer transition-all mr-3">
          <div className="p-2 rounded-full" onClick={changeMode}>
            {mode === "dark" ? <FaMoon /> : <IoIosSunny />}
          </div>
        </div>

        {user?.email ? (
          <Link className="flex items-center gap-3" to={user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"}>
            <HeaderUserUi defaultPhoto={defaultPhoto} photo={user.photo} username={user.username} />

            <div className="hover:bg-neutral-700 p-2 text-xl rounded transition-all cursor-pointer" onClick={logout}>
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
