import { FaTrashCan } from "react-icons/fa6";

import ConfirmDelete from "./ConfirmDelete";
import Modal from "./Modal";

function DeleteIcon({ index, handleDelete, isDeleting }) {
  return (
    <div className="mx-auto text-red-500 border border-red-500 rounded p-1 hover:border-red-700 hover:text-red-700 cursor-pointer transition-all">
      <Modal>
        <Modal.Open opens="delete-quiz">
          <FaTrashCan />
        </Modal.Open>
        <Modal.Window name="delete-quiz">
          <ConfirmDelete source="quiz" itemName={index} onClick={handleDelete} isLoading={isDeleting} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default DeleteIcon;
