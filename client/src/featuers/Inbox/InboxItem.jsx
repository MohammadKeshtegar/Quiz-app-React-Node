import { Link } from "react-router-dom";

function InboxItem() {
  return (
    <div className="bg-neutral-800 border-l-4 border-blue-600 w-full px-6 py-4 text-neutral-300 rounded text-xl font-semibold hover:bg-neutral-700 transition-all hover:cursor-pointer">
      <Link className="flex items-center gap-5">
        <div className="truncate w-40">user name</div>
        <div className="truncate max-w-[700px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis expedita laboriosam fugit eligendi et impedit eveniet quo quia sapiente
          similique.
        </div>
        <div className="ml-auto text-neutral-500 flex items-center gap3">2024/03/12</div>
      </Link>
    </div>
  );
}

export default InboxItem;
