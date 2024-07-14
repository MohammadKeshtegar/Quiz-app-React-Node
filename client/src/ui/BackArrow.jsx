import { IoIosArrowDropleft } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function BackArrow() {
  const navigation = useNavigate();

  function handleClick() {
    navigation(-1);
  }

  return <IoIosArrowDropleft className="text-blue-500 hover:text-blue-400 transition-all cursor-pointer text-4xl mb-5" onClick={handleClick} />;
}

export default BackArrow;
