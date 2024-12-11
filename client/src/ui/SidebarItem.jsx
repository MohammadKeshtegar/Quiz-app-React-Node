import { NavLink } from "react-router-dom";

function SidebarItem({ text, path, isIcon = false, icon }) {
  return (
    <NavLink key={text} to={path}>
      <li
        className={`hover:bg-blue-500 rounded block transition-all ${
          isIcon ? "px-3 py-3 text-lg" : "px-4 py-2"
        }  hover:text-white cursor-pointer`}
      >
        <div className="flex items-center gap-2">
          {icon} {text}
        </div>
      </li>
    </NavLink>
  );
}

export default SidebarItem;
