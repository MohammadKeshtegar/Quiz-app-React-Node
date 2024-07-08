import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

function Menu({ children }) {
  const [openId, setOpenId] = useState("");

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <div className="relative">
      <MenuContext.Provider value={{ openId, close, open }}>{children}</MenuContext.Provider>
    </div>
  );
}

function Toggle({ children, id }) {
  const { openId, open, close } = useContext(MenuContext);

  function handleClick() {
    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <div
      className="flex items-center justify-center w-full h-full rounded-full p-2 hover:bg-neutral-800 hover:cursor-pointer transition-all"
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

function List({ children, id }) {
  const { openId } = useContext(MenuContext);

  if (openId !== id) return null;

  return (
    <div className="absolute bg-neutral-900 rounded p-1 z-30 right-0 top-full shadow-md text-lg">
      <ul>{children}</ul>
    </div>
  );
}

function Item({ children, icon }) {
  return (
    <li className="text-nowrap px-2 py-1 hover:bg-blue-600 rounded transition-all cursor-pointer capitalize flex items-center gap-2">
      {icon} {children}
    </li>
  );
}

Menu.Toggle = Toggle;
Menu.List = List;
Menu.Item = Item;

export default Menu;
