function AuthInput({ children, label, error }) {
  return (
    <div className="my-4">
      <label>{label}</label>
      {children}
      {error && error?.type === "required" && <p className="bg-red-900/50 text-red-200 rounded mt-2 px-2 py-1">{label} is required</p>}
    </div>
  );
}

export default AuthInput;
