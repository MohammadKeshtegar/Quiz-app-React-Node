import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

function Menu({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <MenuContext.Provider value={{ setIsOpen, isOpen }}>{children}</MenuContext.Provider>
    </div>
  );
}

function Toggle({ children }) {
  const { setIsOpen } = useContext(MenuContext);

  return (
    <div
      className="flex items-center justify-center w-full h-full p-2 hover:bg-neutral-800 hover:cursor-pointer transition-all"
      onClick={() => setIsOpen((open) => !open)}
    >
      {children}
    </div>
  );
}

function List({ render, data }) {
  const { isOpen } = useContext(MenuContext);

  if (!isOpen) return null;

  return (
    <div className="absolute bg-neutral-900 rounded p-1 z-30 right-0 top-full shadow-md text-lg">
      <ul>{data.map(render)}</ul>
    </div>
  );
}

function Item({ text, icon }) {
  return (
    <li className="text-nowrap px-2 py-1 hover:bg-blue-600 rounded transition-all cursor-pointer capitalize flex items-center gap-2">
      {icon} {text}
    </li>
  );
}

Menu.Toggle = Toggle;
Menu.List = List;
Menu.Item = Item;

export default Menu;
