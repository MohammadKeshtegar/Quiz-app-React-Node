import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import InvitationToChatGroup from "./InvitationToChatGroup";
import { useReadInbox } from "./useReadInbox";
import BackArrow from "../../ui/BackArrow";
import InvitationAsFriend from "./InvitationAsFriend";

function InboxMessage() {
  const user = useSelector((state) => state.user);
  const { state } = useLocation();
  const { inbox } = state;

  const { readInbox } = useReadInbox(inbox._id);

  useEffect(
    function () {
      if (user.id === inbox.reciever._id) readInbox();
    },
    [readInbox, user.id, inbox.reciever._id]
  );

  return (
    <div className="w-full h-full p-5">
      <BackArrow />

      <div className="text-white bg-neutral-800 p-4 rounded border-t-4 border-blue-600">
        {inbox.messageType === "invite chat" ? <InvitationToChatGroup inbox={inbox} user={user} /> : <InvitationAsFriend inbox={inbox} user={user} />}
      </div>
    </div>
  );
}

export default InboxMessage;
