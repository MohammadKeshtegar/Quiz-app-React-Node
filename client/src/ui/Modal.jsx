import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { GrClose } from "react-icons/gr";

import { useOutSideClick } from "../hooks/useOutSideClick";
import Button from "./Button";

const ModadlContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const openModal = setOpenName;

  return <ModadlContext.Provider value={{ close, openModal, openName }}>{children}</ModadlContext.Provider>;
}

function Open({ children, opens: openWindowName }) {
  const { openModal } = useContext(ModadlContext);

  return cloneElement(children, { onClick: () => openModal(openWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModadlContext);
  const ref = useOutSideClick(close, true);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed w-full h-screen backdrop-blur-sm top-0 left-0 transition-all z-[1000]">
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:bg-neutral-800 bg-zinc-50 p-4 dark:text-white dark:border-neutral-500 border-blue-500 border rounded"
        ref={ref}
      >
        <div className="flex justify-end">
          <Button
            customeStyle="border-red-600 text-red-600 mb-2 hover:bg-red-600 hover:border-red-600 hover:text-white foucus:border-none focus:ring-red-500"
            onClick={close}
          >
            <GrClose />
          </Button>
        </div>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
