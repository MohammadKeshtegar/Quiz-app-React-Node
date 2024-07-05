import { FiPlusCircle } from "react-icons/fi";

import CreateChatGroup from "./CreateChatGroup";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function FirstPage() {
  return (
    <div className="text-neutral-600 text-xl font-semibold w-full h-full flex items-center justify-center flex-col gap-5">
      Start chat by joining to a group or create your own chat group
      <Modal>
        <Modal.Open opens="create-chat-group">
          <Button styleType="fill" customeStyle="gap-2">
            <FiPlusCircle /> Create chat group
          </Button>
        </Modal.Open>
        <Modal.Window name="create-chat-group">
          <CreateChatGroup />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default FirstPage;
