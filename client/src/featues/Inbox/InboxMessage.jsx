import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { useJoinChatGroup } from "../chat/useJoinChatGroup";
import ChatInfoForUser from "../chat/ChatInfoForUser";
import { useGetChat } from "../chat/useGetChat";
import MiniSpinner from "../../ui/MiniSpinner";
import { useReadInbox } from "./useReadInbox";
import BackArrow from "../../ui/BackArrow";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { useCancelInbox } from "./useCancelInbox";

function InboxMessage() {
  const user = useSelector((state) => state.user);
  const { state } = useLocation();
  const { inbox } = state;
  const { isLoading, data } = useGetChat(inbox.sender.chat);
  const { isJoining, joinChat } = useJoinChatGroup();
  const { readInbox } = useReadInbox(inbox._id);
  const { isCancelling, cancelInbox } = useCancelInbox();
  const navigation = useNavigate();

  useEffect(
    function () {
      if (user.id === inbox.reciever._id) readInbox();
    },
    [readInbox, user.id, inbox.reciever._id]
  );

  if (isLoading) return <Spinner />;
  const { data: chat } = data;

  const isUserAMember = chat.members.some((member) => member._id === user.id);

  function handleAccept() {
    joinChat(chat._id);
  }

  function handleCancel() {
    cancelInbox(inbox._id, { onSuccess: () => navigation(-1) });
  }

  return (
    <div className="w-full h-full p-5">
      <BackArrow />

      <div className="text-white bg-neutral-800 p-4 rounded border-t-4 border-blue-600">
        <h2 className="text-neutral-400 mb-5 text-xl">
          From <span className="text-blue-500">{inbox.sender.username}</span>
        </h2>

        <div className="py-2 px-4 rounded border-l-4 border-blue-600 bg-neutral-700/40">
          <h2 className="font-semibold text-xl mb-5 text-neutral-300/90">
            Dear <span className="capitalize">{inbox.reciever.username}</span>
          </h2>

          <p className="text-neutral-300/70">
            You are invited to join to groupname chat group. check group info{" "}
            <Modal>
              <Modal.Open opens={"chat-info"}>
                <span className="text-blue-500 hover:text-blue-600 transition-all hover:cursor-pointer">here</span>
              </Modal.Open>
              <Modal.Window name={"chat-info"}>
                <ChatInfoForUser chat={chat} isAdmin={false} />
              </Modal.Window>
            </Modal>
            .
          </p>
          <p className="text-neutral-300/70">
            To accept this invitation, simply click accept on this message. We look forward to having you on board!
          </p>
        </div>

        {chat.admin !== user.id ? (
          !isUserAMember ? (
            <Button styleType={"fill"} customeStyle={"mt-3 ml-auto"} onClick={handleAccept} disable={isJoining}>
              {isJoining ? <MiniSpinner /> : "Accept"}
            </Button>
          ) : (
            <div className="mt-3 text-right text-neutral-400">You already joined this chat!</div>
          )
        ) : (
          <Button styleType={"fill"} customeStyle={"mt-3 ml-auto bg-red-600 hover:bg-red-500"} onClick={handleCancel} disable={isCancelling}>
            {isCancelling ? <MiniSpinner /> : "Cancel"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default InboxMessage;
