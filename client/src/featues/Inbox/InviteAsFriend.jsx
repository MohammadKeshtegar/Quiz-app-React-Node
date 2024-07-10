import { useSelector } from "react-redux";
import Modal from "../../ui/Modal";
import PlayerInfo from "../user/PlayerInfo";

function InviteAsFriend({ sender, index = 1 }) {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <Modal>
        <Modal.Open opens={"player-info"}>
          <span>{sender.username}</span>
        </Modal.Open>
        <Modal.Window name={"player-info"}>
          <PlayerInfo player={sender} user={user} index={index} />
        </Modal.Window>
      </Modal>
      <p>asked you to join him/her as friend</p>
    </div>
  );
}

export default InviteAsFriend;
