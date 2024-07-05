import { FaUserCircle } from "react-icons/fa";

function HeaderUserUi({ defaultPhoto, photo, username }) {
  return (
    <div className="flex items-center gap-3 hover:bg-neutral-600 rounded p-2 transition-all">
      {!defaultPhoto ? (
        <img src={!defaultPhoto ? `http://127.0.0.1:5000/public/images/users/${photo}` : "/default-user.png"} alt="" className="w-8 rounded-full" />
      ) : (
        <FaUserCircle className="text-2xl" />
      )}
      {username}
    </div>
  );
}

export default HeaderUserUi;
