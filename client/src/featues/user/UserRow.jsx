import { useDeleteUser } from "./useDeleteUser";
import { TbListDetails } from "react-icons/tb";
import DeleteIcon from "../../ui/DeleteIcon";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import UserInfo from "./UserInfo";

function UserRow({ user, index }) {
  const { isDeleting, deleteUser } = useDeleteUser();
  const { name, username, email, rank, points, photo } = user;
  const defaultPhoto = photo?.includes("default");

  function handleDelete() {
    deleteUser(user._id);
  }

  return (
    <Table.Row rowStyle={`p-2 grid-cols-8`}>
      <div className="flex justify-center">
        <img
          src={!defaultPhoto ? `http://127.0.0.1:5000/public/images/users/${photo}` : "/default-user.png"}
          alt="user"
          className="rounded-full w-10"
        />
      </div>
      <div>{name}</div>
      <div className="overflow-hidden text-ellipsis whitespace-nowrap" title={email}>
        {email}
      </div>
      <div>{username}</div>
      <div>{rank}</div>
      <div>{points}</div>

      <div className="flex justify-center">
        <DeleteIcon index={index} handleDelete={handleDelete} isDeleting={isDeleting} />
      </div>
      <div className="flex justify-center text-xl text-blue-500 hover:text-blue-400 transition-all cursor-pointer">
        <Modal>
          <Modal.Open opens="user-info">
            <TbListDetails />
          </Modal.Open>
          <Modal.Window name="user-info">
            <UserInfo user={user} />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default UserRow;
