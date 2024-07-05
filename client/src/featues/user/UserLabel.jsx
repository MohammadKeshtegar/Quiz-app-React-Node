function UserLabel({ label, value }) {
  return (
    <div className="w-full rounded text-black px-5 py-2 shadow-md bg-zinc-50 flex items-center gap-5 dark:bg-neutral-800 dark:text-white">
      <div className="w-20 h-20 p-2 rounded-full flex items-center justify-center text-3xl font-semibold bg-blue-500 dark:bg-blue-600">
        <span className="flex items-center justify-center w-full h-full bg-zinc-50 rounded-full dark:bg-neutral-800">{value}</span>
      </div>
      <span className="w-32 text-lg font-medium">{label}</span>
    </div>
  );
}

export default UserLabel;
