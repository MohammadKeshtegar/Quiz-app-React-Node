import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { useUpdateUserFrineds } from "../user/useUpdateUserFrineds";
import InboxMessageFriendInvite from "./InboxMessageFriendInvite";
import InboxMessageChatInvite from "./InboxMessageChatInvite";
import { useUserStorage } from "../../states/store";
import { useUpdateInbox } from "./useUpdateInbox";
import ShowUserInfo from "../user/ShowUserInfo";
import BackButton from "../../ui/BackButton";
import { useGetInbox } from "./useGetInbox";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function InboxMessage() {
  const { user } = useUserStorage();
  const { inbox: inboxID } = useParams();
  const { isLoading, data } = useGetInbox(inboxID);
  const { isUpdating, updateUserFriends } = useUpdateUserFrineds();
  const { isUpdating: isUpdatingInbox, updateInbox } = useUpdateInbox();
  const queryClient = useQueryClient();

  if (isLoading) return <Spinner />;
  const { data: inbox } = data;

  const checkInboxType = inbox.messageType === "chat-invite" || inbox.messageType === "friend-invite";
  const checkUserIsSender = user._id === inbox.sender._id;
  const isInboxUnknown = inbox.status === "unknown";

  function handleAccept() {
    updateUserFriends({ userID: inbox.reciever._id, newData: { increase: true, user: inbox.sender._id } });
    updateInbox({ inboxID: inbox._id, newData: { status: "accept" } }, { onSuccess: () => queryClient.invalidateQueries("inbox", inbox._id) });
  }

  function handleReject() {
    updateInbox({ inboxID: inbox._id, newData: { status: "reject" } }, { onSuccess: () => queryClient.invalidateQueries("inbox", inbox._id) });
  }

  function handleRemove() {}

  return (
    <div className="w-full h-full p-5 flex flex-col">
      <BackButton />

      <div className="text-white dark:bg-neutral-800 p-4 rounded border-t-4 border-blue-600 shadow-custom-1">
        <h2 className="dark:text-neutral-400 text-black mb-5 text-xl">
          From{" "}
          <Modal>
            <Modal.Open opens="show-user">
              <span className="hover:cursor-pointer dark:hover:text-neutral-300 hover:text-blue-600 transition-all">{inbox.sender.username}</span>
            </Modal.Open>
            <Modal.Window name="show-user">
              <ShowUserInfo />
            </Modal.Window>
          </Modal>
        </h2>

        {inbox.messageType === "chat-invite" && <InboxMessageChatInvite inbox={inbox} username={user.username} />}
        {inbox.messageType === "friend-invite" && <InboxMessageFriendInvite inbox={inbox} username={user.username} />}
        {inbox.messageType === "custom" && <InboxMessageChatInvite inbox={inbox} username={user.username} />}

        {!checkUserIsSender ? (
          isInboxUnknown ? (
            checkInboxType && (
              <div className="flex justify-end gap-2 mt-3">
                <Button styleType="fill" customeStyle="bg-red-600 hover:bg-red-500" onClick={handleReject} disable={isUpdating || isUpdatingInbox}>
                  Reject
                </Button>
                <Button styleType="fill" onClick={handleAccept} disable={isUpdatingInbox}>
                  Accept
                </Button>
              </div>
            )
          ) : (
            <div className="flex justify-end gap-2 mt-3">
              <div className={`rounded px-4 py-2 ${inbox.status === "accept" ? "bg-blue-500" : "bg-red-600"}`} disabled={true}>
                {inbox.status === "accept" ? "Accepted" : "Rejected"}
              </div>
            </div>
          )
        ) : !inbox.read ? (
          <div className="flex justify-end gap-2 mt-3">
            <Button styleType="fill" customeStyle="bg-red-600 hover:bg-red-500" onClick={handleRemove} disable={isUpdating || isUpdatingInbox}>
              Remove
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default InboxMessage;
