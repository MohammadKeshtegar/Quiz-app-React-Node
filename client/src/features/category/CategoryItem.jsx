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
            <span className="dark:bg-blue-600/60 bg-blue-700/80 py-1 px-3 rounded-xl text-sm uppercase space-x-1 dark:text-blue-300 text-blue-100 hover:cursor-pointer dark:hover:bg-blue-800/80 hover:bg-blue-500 transition-all">
              Edit
            </span>
          </Modal.Open>
          <Modal.Window name="edit-category">
            <CreateCategory categoryId={categoryId} category={children} />
          </Modal.Window>
        </Modal>

        <Modal>
          <Modal.Open opens="delete-category">
            <span className="dark:bg-red-700/60 bg-red-600 py-1 px-3 rounded-xl text-sm uppercase space-x-1 dark:text-red-300 text-red-100 hover:cursor-pointer dark:hover:bg-red-800 hover:bg-red-500 transition-all">
              Delete
            </span>
          </Modal.Open>
          <Modal.Window name="delete-category">
            <ConfirmDelete
              source="category"
              isLoading={isDeleting}
              onClick={() => deleteCategory(categoryId)}
              itemName={children}
            />
          </Modal.Window>
        </Modal>
      </div>
    </li>
  );
}

export default CategoryItem;
