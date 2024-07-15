import UserPhoto from "./UserPhoto";

function FriendRow({ friend }) {
  return (
    <li className="py-2 px-3 grid grid-cols-3 items-center border-b border-neutral-700">
      <UserPhoto defaultPhoto={friend.photo?.includes("default")} userPhoto={friend.photo} photoSize={14} />
      <span className="text-center text-lg">{friend.username}</span>
      <span className="text-center text-lg">{friend.points}</span>
    </li>
  );
}

export default FriendRow;
