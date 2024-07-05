import { FaPen } from "react-icons/fa";
import Modal from "../../ui/Modal";
import UserContainerForm from "./UserContainerForm";
import UserPhotoUsernameAndSocialLinks from "./UserPhotoUsernameAndSocialLinks";

function UserProfile({ user }) {
  return (
    <div className="w-full rounded overflow-hidden bg-neutral-800 p-2 relative group shadow-lg">
      <div className="flex items-center gap-5 bg-neutral-900 rounded px-5 py-3">
        <Modal>
          <Modal.Open>
            <div
              className="absolute -top-full right-4 z-20 dark:bg-neutral-600 bg-white p-2 rounded-full text-blue-500 hover:text-white hover:bg-blue-500 transition-all cursor-pointer group-hover:top-4"
              title="Edit profile"
            >
              <FaPen />
            </div>
          </Modal.Open>

          <Modal.Window>
            <UserContainerForm user={user} />
          </Modal.Window>
        </Modal>

        <UserPhotoUsernameAndSocialLinks user={user} />
      </div>

      <div className="w-full text-neutral-400 px-2 py-4 flex flex-col">
        <div className="grid grid-cols-3 place-items-start">
          <span>Email: </span>
          <span className="col-span-2">{user.email}</span>
        </div>

        <div className="grid grid-cols-3">
          <span>Username: </span>
          <span className="col-span-2">{user.username}</span>
        </div>

        <div className="grid grid-cols-3">
          <span>Age: </span>
          <span className="col-span-2">{user.age}</span>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
