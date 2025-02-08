export default function UserPhoto({ photo, photoStyles }) {
  const defaultPhoto = photo?.includes("default");

  return <img src={!defaultPhoto ? `http://127.0.0.1:5000/public/images/users/${photo}` : "/default-user.png"} alt="" className={photoStyles} />;
}
