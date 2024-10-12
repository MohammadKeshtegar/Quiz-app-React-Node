function Button({ children, disable, styleType, type = "button", customeStyle, square = false, onClick }) {
  const initialStyle = `border rounded ${
    square ? "px-2" : "px-4"
  } py-2 text-center transition-all focus:outline-none focus:ring ring-blue-400 flex justify-center items-center`;
  const fillStyle = `bg-blue-500 hover:bg-blue-400 border-none bg-blue-600 cursor-pointer hover:bg-blue-500 text-white `;
  const borderStyle = `border-2 border-blue-500 text-blue-500 uppercase hover:border-blue-600 hover:text-blue-600 `;
  const disabledStyleFill = `disabled:bg-blue-300 disabled:cursor-not-allowed`;
  const disabledStyleBorder = `disabled:border-blue-300 disabled:hover:cursor-not-allowed disabled:text-blue-300`;

  return (
    <button
      onClick={onClick}
      disabled={disable}
      type={type}
      className={`${customeStyle} ${initialStyle} ${styleType === "fill" ? fillStyle : borderStyle} ${
        disable ? (styleType === "fill" ? disabledStyleFill : disabledStyleBorder) : ""
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
