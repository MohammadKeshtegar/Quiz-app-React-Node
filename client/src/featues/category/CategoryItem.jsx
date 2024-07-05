import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import CreateCategory from "./CreateCategory";
import { useDeleteCategory } from "./useDeleteCategory";

function CategoryItem({ children, categoryId }) {
  const { isDeleting, deleteCategory } = useDeleteCategory();

  return (
    <li className="border-b border-neutral-600 p-2 flex items-center justify-between">
      {children}
      <div className="flex items-center gap-2 rounded-full">
        <Modal>
          <Modal.Open opens="edit-category">
            <span className="bg-blue-600/60 py-1 px-3 rounded-xl text-sm uppercase space-x-1 text-blue-300 hover:cursor-pointer hover:bg-blue-800/80 transition-all">
              Edit
            </span>
          </Modal.Open>
          <Modal.Window name="edit-category">
            <CreateCategory categoryId={categoryId} category={children} />
          </Modal.Window>
        </Modal>

        <Modal>
          <Modal.Open opens="delete-category">
            <span className="bg-red-700/60 py-1 px-3 rounded-xl text-sm uppercase space-x-1 text-red-300 hover:cursor-pointer hover:bg-red-800 transition-all">
              Delete
            </span>
          </Modal.Open>
          <Modal.Window name="delete-category">
            <ConfirmDelete source="category" isLoading={isDeleting} onClick={() => deleteCategory(categoryId)} itemName={children} />
          </Modal.Window>
        </Modal>
      </div>
    </li>
  );
}

export default CategoryItem;
