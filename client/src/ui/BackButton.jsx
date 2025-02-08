import { IoIosArrowDropleft } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <div>
      <IoIosArrowDropleft
        className="text-blue-500 hover:text-blue-400 transition-all cursor-pointer text-4xl mb-5"
        title="Back"
        onClick={handleClick}
      />
    </div>
  );
}
