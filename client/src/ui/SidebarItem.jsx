import { NavLink, useLocation } from "react-router-dom";

function SidebarItem({ text, path, isIcon = false, icon }) {
  const fromPath = useLocation();

  return (
    <NavLink
      key={text}
      to={path}
      state={{ from: fromPath.pathname }}
      className="overflow-hidden rounded text-black hover:text-white"
    >
      <li
        className={`hover:bg-blue-500 px-3 rounded block transition-all w-[199px] overflow-hidden ${
          isIcon ? "py-3 text-lg" : "py-2 text-[17px]"
        } cursor-pointer`}
      >
        <div className="flex items-center gap-4 dark:text-neutral-200">
          {isIcon ? null : <span className=" text-lg">{icon}</span>} {text}
        </div>
      </li>
    </NavLink>
  );
}

export default SidebarItem;
