import { cloneElement } from "react";

function ListIconButton({ children, onClick }) {
  return (
    <div className="flex justify-center">
      {cloneElement(children, {
        className:
          "text-blue-500 hover:text-blue-400 text-2xl border border-blue-500 hover:border-blue-400 rounded transition-all p-0.5 cursor-pointer",
        onClick: onClick,
      })}
    </div>
  );
}

export default ListIconButton;
