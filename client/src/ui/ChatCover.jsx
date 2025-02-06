export default function ChatCover({ cover }) {
  const defaultCover = cover?.includes("default");

  return (
    <img src={!defaultCover ? `http://127.0.0.1:5000/public/images/users/${cover}` : "/default-user.png"} alt="user" className="rounded-full w-10" />
  );
}
