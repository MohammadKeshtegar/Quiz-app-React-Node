import { IoMdEye } from "react-icons/io";

import ListIconButton from "../../ui/ListIconButton";
import PlayerProfile from "./PlayerProfile";
import UserPhoto from "../../ui/UserPhoto";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";

function PlayerRow({ index, player, chatData = undefined }) {
  const { username, points, photo, confirmedQuiz } = player;

  console.log(chatData);

  return (
    <Table.Row rowStyle="p-2 grid-cols-5">
      <div>{index + 1}</div>
      <div className="flex justify-center">
        <UserPhoto photo={photo} photoStyles="rounded-full w-10" />
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
          <PlayerProfile confirmedQuiz={confirmedQuiz} chat={chatData} player={player} index={index} points={points} />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default PlayerRow;
