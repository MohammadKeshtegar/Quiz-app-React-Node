function PaginationButton({ children, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} className="h-8 w-12 hover:bg-blue-500 flex items-center justify-center transition-all">
      {children}
    </button>
  );
}

export default PaginationButton;
