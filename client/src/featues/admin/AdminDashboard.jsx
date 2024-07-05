import { useGetAllCategories } from "../category/useGetAllCategories";
import CreateCategory from "../category/CreateCategory";
import CategoryItem from "../category/CategoryItem";
import UserProfile from "../user/UserProfile";
import Button from "../../ui/Button";
import UserLabel from "../user/UserLabel";
import LineChart from "../../ui/LineChart";
import PieChart from "../../ui/PieChart";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteAllCategories } from "../category/useDeleteAllCategories";
import { useSelector } from "react-redux";
import AdminMiniChat from "./AdminMiniChat";

function AdminDashboard() {
  const user = useSelector((state) => state.user);
  const { data, isLoading } = useGetAllCategories();
  const { isDeleting, deleteAllCategories } = useDeleteAllCategories();

  if (isLoading) return <Spinner />;
  const { data: categories, results } = data;

  return (
    <div className="w-full p-3 h-full flex flex-col gap-3">
      <div className="flex gap-5 items-center w-full">
        <UserLabel label="Users" value={0} />
        <UserLabel label="Quizzes" value={0} />
        <UserLabel label="How many item purched" value={0} />
        <UserLabel label="Friends" value={user.friends.length} />
      </div>

      <div className="text-neutral-600 rounded shadow-lg">
        <div className="bg-neutral-800 rounded">
          <LineChart />
        </div>
      </div>

      <div className="w-full flex gap-3">
        <div className="w-1/2 flex flex-col gap-3">
          <UserProfile user={user} />
          <AdminMiniChat />
        </div>

        <div className="w-1/2 bg-neutral-800 rounded p-3">
          <div className="w-full h-[450px] flex justify-center bg-neutral-900/80 mb-4 rounded">
            <PieChart />
          </div>

          <div className="bg-neutral-900/70 text-neutral-300 rounded h-[270px]">
            <div className="flex flex-col h-full">
              <div className="border-b border-blue-500 p-4 flex items-center justify-between">
                <span className="text-lg font-semibold">Categories: {categories.length}</span>
                <div className="flex items-center gap-3">
                  <Modal>
                    <Modal.Open opens="delete-all-category">
                      <Button customeStyle="bg-red-600 hover:bg-red-500 uppercase" styleType="fill">
                        Delete all
                      </Button>
                    </Modal.Open>

                    <Modal.Window name="delete-all-category">
                      <ConfirmDelete source="categories" all={true} isLoading={isDeleting} onClick={deleteAllCategories} />
                    </Modal.Window>
                  </Modal>

                  <Modal>
                    <Modal.Open opens="create-category">
                      <Button customeStyle="uppercase" styleType="fill">
                        Create
                      </Button>
                    </Modal.Open>

                    <Modal.Window name="create-category">
                      <CreateCategory />
                    </Modal.Window>
                  </Modal>
                </div>
              </div>
              {results > 0 ? (
                <div className="w-full overflow-y-scroll">
                  <ul>
                    {categories.map((category) => (
                      <CategoryItem key={category._id} categoryId={category._id}>
                        {category.category}
                      </CategoryItem>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-center pt-20 w-full">No category found!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
