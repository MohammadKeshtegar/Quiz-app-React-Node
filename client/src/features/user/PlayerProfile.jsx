import UserPhotoUsernameAndSocialLinks from "./UserPhotoUsernameAndSocialLinks";
import { useCreateInbox } from "../Inbox/useCreateInbox";
import { useUserStorage } from "../../states/store";
import ChatPicture from "../../ui/ChatPicture";
import LineChart from "../../ui/LineChart";
import Button from "../../ui/Button";
import UserLabel from "./UserLabel";

export default function PlayerProfile({ confirmedQuiz, chat, player, index, points }) {
  const { sendMail, isSending } = useCreateInbox();
  const { user } = useUserStorage();

  function handleInviteChat() {
    sendMail({ sender: user._id, reciever: player._id, messageType: "chat-invite" });
  }

  function handleAskFriend() {
    sendMail({ sender: user._id, reciever: player._id, messageType: "friend-invite" });
  }

  return (
    <div className="w-[1200px] h-full flex flex-col rounded dark:bg-neutral-900">
      <div className="w-full flex">
        <div className="flex flex-col items-center gap-5 rounded px-5 py-3 w-1/2">
          <UserPhotoUsernameAndSocialLinks user={player} />

          <div className="w-full flex gap-2">
            {player._id !== user._id && (
              <Button styleType="fill" customeStyle="w-full flex justify-center" onClick={handleInviteChat} disable={isSending}>
                Ask to be friends
              </Button>
            )}

            {player._id !== user._id && (
              <Button styleType="fill" customeStyle="w-full flex justify-center" onClick={handleAskFriend} disable={isSending}>
                Invite to group
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 grid-rows-2 p-2 w-1/2 items-center">
          <UserLabel label={"Rank"} value={index + 1} />
          <UserLabel label={"Confirmed quiz"} value={confirmedQuiz.length} />
          <UserLabel label={"Points"} value={points} />
          <div className="w-full h-20 rounded text-black px-3 shadow-md bg-zinc-50 flex items-center gap-5 dark:bg-neutral-800 dark:text-white">
            {chat ? (
              <>
                <ChatPicture picture={chat.picture} pictureStyles="w-20 h-20 p-2 rounded-full flex items-center justify-center" />
                <span className="text-lg dark:text-white font-bold capitalize">{chat.name}</span>
              </>
            ) : (
              <div className="text-xl font-semibold capitalize">No chat gorup</div>
            )}
          </div>
        </div>
      </div>

      <div className="p-2">
        <div className="w-full dark:bg-neutral-800 bg-neutral-100 dark:shadow-none shadow-custom-1 rounded py-2 px-3 text-neutral-400">
          <div className="dark:bg-neutral-800 rounded">
            <LineChart />
          </div>
        </div>
      </div>
    </div>
  );
}
