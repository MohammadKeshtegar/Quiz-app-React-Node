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

/*
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";




const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <div className="flex items-center justify-center">

    <MenusContext.Provider value={{ openId, close, open, position, setPosition }}>
      {children}
    </MenusContext.Provider>
    </div>
  );
}

function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }
  const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;
  return (
    <button className="" onClick={handleClick}>
      <HiEllipsisVertical />
    </button>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
*/
