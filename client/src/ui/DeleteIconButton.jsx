import { FaTrashCan } from "react-icons/fa6";

import ConfirmDelete from "./ConfirmDelete";
import Modal from "./Modal";

function DeleteIconButton({ source, itemName, handleDelete, isDeleting }) {
  return (
    <div
      className={`mx-auto ${
        handleDelete ? "text-red-500 border-red-500 hover:border-red-700 hover:text-red-700" : "text-neutral-600 border-neutral-600"
      } cursor-pointer border p-1 rounded transition-all`}
    >
      <Modal>
        <Modal.Open opens="delete-quiz">
          <FaTrashCan />
        </Modal.Open>
        <Modal.Window name="delete-quiz">
          <ConfirmDelete source={source} itemName={itemName} onClick={handleDelete} isLoading={isDeleting} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default DeleteIconButton;
