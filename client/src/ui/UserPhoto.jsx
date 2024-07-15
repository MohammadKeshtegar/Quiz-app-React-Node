function UserPhoto({ defaultPhoto, userPhoto, photoSize }) {
  return (
    <img
      src={!defaultPhoto ? `http://127.0.0.1:5000/public/images/users/${userPhoto}` : "/default-user.png"}
      className={`w-${photoSize} h-${photoSize} rounded-full overflow-hidden z-20`}
      alt="user-img"
    />
  );
}

export default UserPhoto;
