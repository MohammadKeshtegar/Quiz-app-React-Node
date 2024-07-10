import { RxCrossCircled } from "react-icons/rx";
import { useSelector } from "react-redux";

import { useRemoveMember } from "./useRemoveMember";
import GroupPicture from "../../ui/GroupPicture";
import Button from "../../ui/Button";
import MiniSpinner from "../../ui/MiniSpinner";
import { useState } from "react";

function ChatInfoForUser({ chat, isAdmin, onCloseModal }) {
  const [removeUser, setRemoveUser] = useState("");
  const user = useSelector((state) => state.user);
  const isInGroup = chat.members.some((member) => member._id === user.id);
  const { isRemoving, removeMember } = useRemoveMember(chat._id, onCloseModal);

  function handleDeleteMember(userId) {
    removeMember({ chatId: chat._id, userId });
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5 items-center">
        <GroupPicture chatPicture={chat.picture} pictureSize={"w-24 h-24"} />
        <p className="text-2xl font-semibold">{chat.name}</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-neutral-400 text-xl">users: {chat.members.length}</p>
        {!isInGroup && <Button styleType="fill">Join</Button>}
      </div>

      <div className="w-[350px]">
        <ul className="bg-neutral-700 rounded p-1 max-h-96 overflow-y-auto divide-y-2 divide-neutral-500">
          {chat.members.map((member) => (
            <li key={member._id} className="flex items-center gap-5 px-4 py-3 group hover:bg-neutral-700 transition-all">
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
                {isAdmin && (
                  <>
                    {isRemoving && member._id === removeUser ? (
                      <MiniSpinner />
                    ) : (
                      <RxCrossCircled
                        className="text-5xl text-red-500 hover:text-red-600 transition-all hover:cursor-pointer"
                        onClick={() => {
                          setRemoveUser(member._id);
                          handleDeleteMember(member._id);
                        }}
                      />
                    )}
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChatInfoForUser;
