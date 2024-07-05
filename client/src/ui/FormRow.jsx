function FormRow({ children, htmlFor, text }) {
  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <label className="text-nowrap font-semibold" htmlFor={htmlFor}>
        {text} :
      </label>
      <span className="col-span-2">{children}</span>
    </div>
  );
}

export default FormRow;
