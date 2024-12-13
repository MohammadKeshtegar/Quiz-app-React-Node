import IconLink from "../../ui/IconLink";
import { FaTelegram, FaInstagram, FaLinkedin, FaReddit } from "react-icons/fa";
import { FaXTwitter, FaDiscord } from "react-icons/fa6";

function UserPhotoUsernameAndSocialLinks({ user }) {
  const { telegram, discord, reddit, twitter, instagram, linkedin } = user;
  const defaultPhoto = user.photo?.includes("default");
  const links = Array.from([
    { link: telegram, icon: <FaTelegram /> },
    { link: discord, icon: <FaDiscord /> },
    { link: reddit, icon: <FaReddit /> },
    { link: twitter, icon: <FaXTwitter /> },
    { link: instagram, icon: <FaInstagram /> },
    { link: linkedin, icon: <FaLinkedin /> },
  ]);

  return (
    <div className="flex items-center gap-5 bg-neutral-900 rounded px-5 py-3 w-full">
      <div className="rounded-full ">
        <img
          src={!defaultPhoto ? `http://127.0.0.1:5000/public/images/users/${user.photo}` : "/default-user.png"}
          className="w-28 h-28 border-4 border-blue-500 rounded-full overflow-hidden z-20"
          alt="user-img"
        />
      </div>

      <div className="divide-y-2 divide-blue-700 mx-auto w-3/5">
        <div className="flex justify-center items-center p-3 text-neutral-500 uppercase font-semibold">
          <span>{user.name}</span>
        </div>

        <div className="w-full flex items-center justify-center gap-2 text-xl text-blue-400 p-3">
          {links.map((link) => (link.link ? <IconLink key={link.link} icon={link.icon} link={link.link} /> : null))}
        </div>
      </div>
    </div>
  );
}

export default UserPhotoUsernameAndSocialLinks;
