function Button({ children, disable, styleType, type = "button", customeStyle, onClick }) {
  const initialStyle = `border rounded px-4 py-2 text-center transition-all focus:outline-none focus:ring ring-blue-400 flex items-center`;
  const fillStyle = `bg-blue-500 hover:bg-blue-400 border-none bg-blue-600 hover:cursor-pointer hover:bg-blue-500 text-white ` + initialStyle;
  const borderStyle = `border-2 border-blue-500 text-blue-500 uppercase hover:border-blue-600 hover:text-blue-600 ` + initialStyle;
  const disabledStyleFill = `disabled:bg-blue-300 disabled:hover:cursor-not-allowed` + initialStyle;
  const disabledStyleBorder = `disabled:border-blue-300 disabled:hover:cursor-not-allowed disabled:text-blue-300` + initialStyle;

  return (
    <button
      onClick={onClick}
      disabled={disable}
      type={type}
      className={`${customeStyle} ${styleType === "fill" ? fillStyle : borderStyle} ${
        disable ? (styleType === "fill" ? disabledStyleFill : disabledStyleBorder) : ""
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
