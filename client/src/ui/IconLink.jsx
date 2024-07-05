import { Link } from "react-router-dom";

function IconLink({ icon, link }) {
  return (
    <Link className="hover:text-blue-600 transition-all" to={link}>
      {icon}
    </Link>
  );
}

export default IconLink;
