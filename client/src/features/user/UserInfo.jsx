function UserInfo({ user }) {
  const { name, username, email, rank, owner, points, photo, createdAt, updatedAt, confirmedQuiz, createdQuiz } = user;
  const defaultPhoto = photo?.includes("default");

  return (
    <div>
      <img
        src={!defaultPhoto ? `http://127.0.0.1:5000/public/images/users/${photo}` : "/default-user.png"}
        alt="user"
        className="rounded-full w-52 mx-auto mb-10"
      />

      <div className="grid grid-cols-2 gap-y-2 dark:text-neutral-400 text-black border-t border-neutral-400 pt-4">
        <span>Name</span>
        <span>{name}</span>

        <span>Username</span>
        <span>{username}</span>

        <span>Email</span>
        <span>{email}</span>

        <span>Owner</span>
        <span className="capitalize">{`${owner}`}</span>

        <span>Rank</span>
        <span>{rank}</span>

        <span>Points</span>
        <span>{points}</span>

        <span>Confirmed quiz</span>
        <span>{confirmedQuiz.length}</span>

        <span>Created quiz</span>
        <span>{createdQuiz.length}</span>

        <span>Joined at</span>
        <span>{new Date(createdAt).toLocaleString()}</span>

        <span>Updated at</span>
        <span>{new Date(updatedAt).toLocaleString()}</span>
      </div>
    </div>
  );
}

export default UserInfo;
