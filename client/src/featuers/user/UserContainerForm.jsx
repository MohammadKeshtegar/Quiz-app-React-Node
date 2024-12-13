import UpdateUserData from "./UpdateUserData";
import UpdateUserPassword from "./UpdateUserPassword";

function UserContainerForm({ user }) {
  return (
    <div className="flex justify-between w-[1200px] p-5 divide-x-2 divide-neutral-600">
      <UpdateUserData user={user} />
      <UpdateUserPassword user={user} />
    </div>
  );
}

export default UserContainerForm;
