function UserLabel({ label, value }) {
  return (
    <div className="w-full h-20 rounded overflow-hidden flex items-center gap-5 dark:bg-neutral-800 dark:shadow-none  shadow-custom-1">
      <div className="w-28 h-full p-2 flex items-center justify-center text-3xl font-semibold text-white bg-blue-500 dark:bg-blue-600">{value}</div>
      <span className="w-34 text-xl font-medium text-center text-black dark:text-white">{label}</span>
    </div>
  );
}

export default UserLabel;
