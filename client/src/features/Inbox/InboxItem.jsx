import { Link } from "react-router-dom";

function InboxItem() {
  return (
    <div className="dark:bg-neutral-800 border-l-4 border-blue-600 w-full px-6 py-4 dark:text-neutral-300 text-black rounded text-xl font-semibold dark:hover:bg-neutral-700 hover:bg-neutral-100 transition-all hover:cursor-pointer shadow-custom-1">
      <Link className="flex items-center gap-5">
        <div className="truncate w-40">user name</div>
        <div className="truncate max-w-[700px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis expedita laboriosam fugit eligendi et impedit eveniet
          quo quia sapiente similique.
        </div>
        <div className="ml-auto dark:text-neutral-500 text-neutral-400 flex items-center gap3">2024/03/12</div>
      </Link>
    </div>
  );
}

export default InboxItem;
