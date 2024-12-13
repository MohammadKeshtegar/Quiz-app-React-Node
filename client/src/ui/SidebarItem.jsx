import { NavLink } from "react-router-dom";

function SidebarItem({ text, path, isIcon = false, icon }) {
  return (
    <NavLink key={text} to={path} className=" overflow-hidden rounded">
      <li
        className={`hover:bg-blue-500 rounded block transition-all w-[199px] overflow-hidden ${
          isIcon ? "px-3 py-3 text-lg" : "px-3 py-2 text-[17px]"
        }  hover:text-white cursor-pointer`}
      >
        <div className="flex items-center gap-4">
          {isIcon ? null : <span className=" text-lg">{icon}</span>} {text}
        </div>
      </li>
    </NavLink>
  );
}

export default SidebarItem;
