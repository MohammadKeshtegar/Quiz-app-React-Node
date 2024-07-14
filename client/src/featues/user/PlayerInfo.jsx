import { useState } from "react";

import UserPhotoUsernameAndSocialLinks from "./UserPhotoUsernameAndSocialLinks";
import { useCreateInbox } from "../Inbox/useCreateInbox";
import SpinnerItself from "../../ui/SpinnerItself";
import { useGetChat } from "../chat/useGetChat";
import MiniSpinner from "../../ui/MiniSpinner";
import Button from "../../ui/Button";
import UserLabel from "./UserLabel";

function PlayerInfo({ player, user, index }) {
  const file = undefined;
  const [isChatInvitation, setIsChatInvitation] = useState(false);
  const { isLoading, data } = useGetChat(player.chat);
  const { isCreating, sendInbox } = useCreateInbox();

  if (isLoading)
    return (
      <div className="w-96 bg-neutral-900 rounded p-2 flex items-center justify-center h-56">
        <SpinnerItself />
      </div>
    );
  const chat = data?.data;

  function handleFriendInvatation() {
    setIsChatInvitation(false);
    sendInbox({ sender: user.id, reciever: player._id, messageType: "invite as friend" });
  }

  function handleChatGroupInvatation() {
    setIsChatInvitation(true);
    sendInbox({ sender: user.id, reciever: player._id, messageType: "invite chat" });
  }

  return (
    <div className="w-full h-full flex flex-col rounded bg-neutral-900">
      <div className="w-full flex flex-col">
        <UserPhotoUsernameAndSocialLinks user={player} />

        <div className="grid grid-cols-2 gap-2 grid-rows-2 p-2 w-full">
          <UserLabel label={"Rank"} value={index + 1} />
          <UserLabel label={"Confirmed quiz"} value={player.confirmedQuiz.length} />
          <UserLabel label={"Points"} value={player.points} />

          <div className="w-full rounded text-black px-5 py-2 shadow-md bg-zinc-50 flex items-center gap-5 dark:bg-neutral-800 dark:text-white">
            <img src={file || "/default-back.png"} alt="group-post" className="w-20 h-20 p-2 rounded-full flex items-center justify-center" />
            {chat ? (
              <span className="flex items-center justify-center w-full h-full bg-zinc-50 rounded-full dark:bg-neutral-800"></span>
            ) : (
              <div className="text-xl font-semibold">No group</div>
            )}
          </div>
        </div>

        {player._id !== user.id && (
          <div className="w-full flex flex-col gap-2 p-2">
            <Button onClick={handleFriendInvatation} disable={isCreating} styleType="fill" customeStyle="w-full flex justify-center">
              {!isChatInvitation && isCreating ? <MiniSpinner /> : "Invite as friend"}
            </Button>

            {player.chat ? (
              <Button onClick={handleChatGroupInvatation} disable={isCreating} styleType="fill" customeStyle="w-full flex justify-center">
                {isChatInvitation && isCreating ? <MiniSpinner /> : "Invite to group"}
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayerInfo;
