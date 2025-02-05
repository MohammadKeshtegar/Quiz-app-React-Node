import { IoMdEye } from "react-icons/io";

import UserPhotoUsernameAndSocialLinks from "./UserPhotoUsernameAndSocialLinks";
import ListIconButton from "../../ui/ListIconButton";
import LineChart from "../../ui/LineChart";
import Button from "../../ui/Button";
import UserLabel from "./UserLabel";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";

function PlayerRow({ index, player, chatData = undefined, hasChat = false }) {
  const { username, points, photo, confirmedQuiz, chat } = player;
  const defaultPhoto = photo?.includes("default");
  const file = undefined;

  return (
    <Table.Row rowStyle="p-2 grid-cols-5">
      <div>{index + 1}</div>
      <div className="flex justify-center">
        <img
          src={!defaultPhoto ? `http://127.0.0.1:5000/public/images/users/${photo}` : "/default-user.png"}
          alt="user"
          className="rounded-full w-10"
        />
      </div>
      <div>{username}</div>
      <div>{points}</div>

      <Modal>
        <Modal.Open>
          <ListIconButton>
            <IoMdEye />
          </ListIconButton>
        </Modal.Open>

        <Modal.Window>
          <div className="w-[1200px] h-full flex flex-col rounded bg-neutral-900">
            <div className="w-full flex">
              <div className="flex flex-col items-center gap-5 rounded px-5 py-3 w-1/2">
                <UserPhotoUsernameAndSocialLinks user={player} />
                <div className="w-full flex gap-2">
                  <Button styleType="fill" customeStyle="w-full flex justify-center">
                    Ask as friend
                  </Button>
                  <Button styleType="fill" customeStyle="w-full flex justify-center">
                    Invite to group
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 grid-rows-2 p-2 w-1/2">
                <UserLabel label={"Rank"} value={index + 1} />
                <UserLabel label={"Confirmed quiz"} value={confirmedQuiz.length} />
                <UserLabel label={"Points"} value={points} />
                {/* <UserLabel label={"Group"} value={0} /> */}
                <div className="w-full rounded text-black px-5 py-2 shadow-md bg-zinc-50 flex items-center gap-5 dark:bg-neutral-800 dark:text-white">
                  <img src={file || "/default-back.png"} alt="group-post" className="w-20 h-20 p-2 rounded-full flex items-center justify-center" />
                  {chat ? (
                    <span className="flex items-center justify-center w-full h-full bg-zinc-50 rounded-full dark:bg-neutral-800"></span>
                  ) : (
                    <div className="text-xl font-semibold">No group</div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-2">
              <div className="w-full bg-neutral-800 rounded py-2 px-3 text-neutral-400">
                <div className="bg-neutral-800 rounded">
                  <LineChart />
                </div>
              </div>
            </div>
          </div>
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default PlayerRow;
