function PaginationButton({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="h-8 w-12 hover:bg-blue-500 hover:text-white m-0 p-0 overflow-hidden flex items-center justify-center transition-all"
    >
      {children}
    </button>
  );
}

export default PaginationButton;
