function GroupPicture({ chatPicture, pictureSize }) {
  const hasPicture = chatPicture.startsWith("default");

  return (
    <img
      src={!hasPicture ? `http://127.0.0.1:5000/public/images/chat/${chatPicture}` : "/default-back.png"}
      alt="user-profile"
      className={`${pictureSize} object-cover rounded-full`}
    />
  );
}

export default GroupPicture;
