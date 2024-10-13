import { cloneElement } from "react";

function ListIconButton({ children, onClick, disable = false }) {
  return (
    <button className="flex justify-center" disabled={disable}>
      {cloneElement(children, {
        className: `${
          disable
            ? "text-neutral-500 border-neutral-500 cursor-not-allowed"
            : "text-blue-500 hover:text-blue-400 border-blue-500 hover:border-blue-400"
        } text-2xl border rounded transition-all p-0.5 cursor-pointer`,
        onClick: onClick,
        title: disable ? "You either had done this quiz or you are the owner of this quiz" : "",
      })}
    </button>
  );
}

export default ListIconButton;
