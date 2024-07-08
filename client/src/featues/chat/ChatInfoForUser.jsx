import { useSelector } from "react-redux";

import GroupPicture from "../../ui/GroupPicture";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ChatInfoForAdmin from "./ChatInfoForAdmin";

function ChatInfoForUser({ chat }) {
  const user = useSelector((state) => state.user);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5 items-center">
        <GroupPicture chatPicture={chat.picture} pictureSize={"w-24 h-24"} />
        <p className="text-2xl font-semibold">{chat.name}</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-neutral-400 text-xl">users: {chat.members.length}</p>
        {user.id === chat.admin ? (
          <Modal>
            <Modal.Open opens={"edit-chat"}>
              <Button styleType="fill">Edit</Button>
            </Modal.Open>
            <Modal.Window name={"edit-chat"}>
              <ChatInfoForAdmin chat={chat} />
            </Modal.Window>
          </Modal>
        ) : (
          <Button styleType="fill">Join</Button>
        )}
      </div>

      <div className="w-[350px]">
        <ul className="bg-neutral-700 rounded p-1 max-h-96 overflow-y-auto divide-y-2 divide-neutral-500">
          {chat.members.map((member) => (
            <li className="flex items-center gap-5 px-4 py-3 group hover:bg-neutral-700 transition-all">
              <div className="flex items-center gap-5 w-full">
                <img
                  src={!member.photo?.includes("default") ? `http://127.0.0.1:5000/public/images/users/${member.photo}` : "/default-user.png"}
                  alt=""
                  className="w-16 rounded-full"
                />
                <p className="text-xl font-semibold flex items-center justify-between w-full">
                  <span className="w-40 truncate overflow-hidden">{member.username}</span>
                  {member._id === chat.admin && <span className="text-lg text-neutral-400">admin</span>}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChatInfoForUser;
