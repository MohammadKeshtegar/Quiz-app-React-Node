import { useNavigate } from "react-router-dom";

import { useCancelInbox } from "../featues/Inbox/useCancelInbox";
import MiniSpinner from "./MiniSpinner";
import Button from "./Button";

function CancelButton({ inboxId }) {
  const { isCancelling, cancelInbox } = useCancelInbox();
  const navigation = useNavigate();

  function handleCancel() {
    cancelInbox(inboxId, { onSuccess: () => navigation(-1) });
  }

  return (
    <Button styleType={"fill"} customeStyle={"mt-3 ml-auto bg-red-600 hover:bg-red-500"} onClick={handleCancel} disable={isCancelling}>
      {isCancelling ? <MiniSpinner /> : "Cancel"}
    </Button>
  );
}

export default CancelButton;
