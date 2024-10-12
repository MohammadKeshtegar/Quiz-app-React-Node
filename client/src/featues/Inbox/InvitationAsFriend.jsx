import CancelButton from "../../ui/CancelButton";
import PlayerInfo from "../user/PlayerInfo";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { useUpdateUserFriends } from "../user/useUpdateUserFriends";
import MiniSpinner from "../../ui/MiniSpinner";

function InvitationAsFriend({ inbox, index = 1, user }) {
  const { isAccepting, updateFriends } = useUpdateUserFriends(user.id);

  function handleAcceptFriend() {
    updateFriends(inbox.sender._id);
  }

  console.log(inbox.sender);

  return (
    <>
      <h2 className="text-neutral-400 mb-5 text-xl">
        From{" "}
        <Modal>
          <Modal.Open opens={"player-info"}>
            <span className="text-blue-500 hover:text-blue-600 transition-all hover:cursor-pointer">{inbox.sender.username}</span>
          </Modal.Open>
          <Modal.Window name={"player-info"}>
            <PlayerInfo player={inbox.sender} user={user} index={index} />
          </Modal.Window>
        </Modal>
      </h2>

      <p className="text-neutral-300/70">
        <span className="capitalize">{inbox.sender.username}</span> Has sent a request for friendship
      </p>

      {!inbox.read ? (
        inbox.sender._id === user.id ? (
          <CancelButton inboxId={inbox._id} />
        ) : (
          <Button styleType={"fill"} customeStyle={"mt-3 ml-auto"} onClick={handleAcceptFriend}>
            {isAccepting ? <MiniSpinner /> : "Accept"}
          </Button>
        )
      ) : null}
    </>
  );
}

export default InvitationAsFriend;
