export default function ChatPicture({ picture, pictureStyles }) {
  console.log(picture);
  const defaultPicture = picture?.includes("default");

  return (
    <img src={!defaultPicture ? `http://127.0.0.1:5000/public/images/users/${picture}` : "/default-user.png"} alt="user" className={pictureStyles} />
  );
}
