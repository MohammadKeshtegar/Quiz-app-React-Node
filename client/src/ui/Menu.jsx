import { createContext, useContext, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import { useOutSideClick } from "../hooks/useOutSideClick";

const MenuContext = createContext();

function Menu({ children }) {
  const [openId, setOpenId] = useState("");

  const close = () => setOpenId("");
  const openMenu = setOpenId;

  return (
    <div>
      <MenuContext.Provider value={{ openId, close, openMenu }}>{children}</MenuContext.Provider>
    </div>
  );
}

function Toggle({ id }) {
  const { openId, openMenu, close } = useContext(MenuContext);

  function handleClick(e) {
    e.stopPropagation();
    openId === "" || openId !== id ? openMenu(id) : close();
  }

  return (
    <button
      className="flex items-center justify-center w-full h-full rounded-full p-2 hover:bg-neutral-800 hover:cursor-pointer transition-all relative"
      onClick={handleClick}
    >
      <BsThreeDotsVertical />
    </button>
  );
}

function List({ children, id }) {
  const { openId, close } = useContext(MenuContext);
  const ref = useOutSideClick(close, true);

  if (openId !== id) return null;

  return (
    <ul ref={ref} className="absolute bg-neutral-900 rounded p-1 z-30 shadow-md text-lg">
      {children}
    </ul>
  );
}

function Item({ children, icon }) {
  const { close } = useContext(MenuContext);

  function handleItemClick() {
    close();
  }

  return (
    <li
      onClick={handleItemClick}
      className="text-nowrap px-2 py-1 hover:bg-blue-600 rounded transition-all cursor-pointer capitalize flex items-center gap-2"
    >
      {icon} <span>{children}</span>
    </li>
  );
}

Menu.Toggle = Toggle;
Menu.List = List;
Menu.Item = Item;

export default Menu;
