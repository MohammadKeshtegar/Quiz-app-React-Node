import { useSelector } from "react-redux";
import { IoMdEye } from "react-icons/io";

import ListIconButton from "../../ui/ListIconButton";
import PlayerInfo from "./PlayerInfo";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";

function PlayerRow({ index, player }) {
  const { username, points, photo } = player;
  const user = useSelector((state) => state.user);
  const defaultPhoto = photo?.includes("default");

  return (
    <Table.Row rowStyle={`p-2 grid-cols-5 ${player._id === user.id && "bg-neutral-800"}`}>
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
        <Modal.Open opens={"player-info"}>
          <ListIconButton>
            <IoMdEye />
          </ListIconButton>
        </Modal.Open>

        <Modal.Window name={"player-info"}>
          <PlayerInfo player={player} user={user} index={index} />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default PlayerRow;
