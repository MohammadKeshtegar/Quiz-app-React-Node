import { Link } from "react-router-dom";

function ButtonLink({ children, disable, styleType, customeStyle, onClick, url, state }) {
  const initialStyle = `border rounded px-4 py-2 text-center transition-all focus:outline-none focus:ring ring-blue-400 flex items-center`;
  const fillStyle = `bg-blue-500 hover:bg-blue-400 border-none bg-blue-600 hover:cursor-pointer hover:bg-blue-500 text-white ` + initialStyle;
  const borderStyle = `border-2 border-blue-500 text-blue-500 uppercase hover:border-blue-600 hover:text-blue-600 ` + initialStyle;
  const disabledStyleFillLink = `bg-blue-300 hover:cursor-not-allowed hover:bg-blue-300 ` + initialStyle;
  const disabledStyleBorderLink = `border-blue-300 hover:cursor-not-allowed text-blue-300 ` + initialStyle;

  return (
    <Link
      state={state}
      to={url}
      onClick={onClick}
      className={`${customeStyle} ${
        disable ? (styleType === "fill" ? disabledStyleFillLink : disabledStyleBorderLink) : styleType === "fill" ? fillStyle : borderStyle
      } `}
    >
      {children}
    </Link>
  );
}

export default ButtonLink;
