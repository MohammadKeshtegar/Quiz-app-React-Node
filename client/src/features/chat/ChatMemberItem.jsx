import Table from "../../ui/Table";

export default function ChatMemberItem({ member }) {
  const defaultPhoto = member.photo?.includes("default");

  return (
    <Table.Row rowStyle="grid-cols-4 py-2">
      <div className="flex items-center justify-center">
        <img
          src={!defaultPhoto ? `http://127.0.0.1:5000/public/images/users/${member.photo}` : "/default-user.png"}
          className="w-16 h-16 border-2 border-blue-500 rounded-full overflow-hidden z-20"
          alt="user-img"
        />
      </div>
      <div>{member.username}</div>
      <div>{member.points}</div>
      <div>{member.confirmedQuiz.length}</div>
    </Table.Row>
  );
}
