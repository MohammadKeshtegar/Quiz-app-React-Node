import { FaPen } from "react-icons/fa";

import UserPhotoUsernameAndSocialLinks from "./UserPhotoUsernameAndSocialLinks";
import UserContainerForm from "./UserContainerForm";
import Modal from "../../ui/Modal";

function UserProfile({ user }) {
  return (
    <div className="w-full rounded overflow-hidden dark:bg-neutral-800 p-2 relative group shadow-custom-1">
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

      <div className="w-full dark:text-neutral-400 text-black px-2 py-4 flex flex-col">
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
