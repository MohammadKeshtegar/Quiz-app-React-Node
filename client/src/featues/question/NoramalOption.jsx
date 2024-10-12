function NoramalOption({ correctAnswer, option, index }) {
  return (
    <div
      className={`${correctAnswer === index ? "bg-blue-600" : " dark:bg-neutral-800 bg-neutral-100 dark:text-white text-black"} rounded p-2 text-lg`}
    >
      {option}
    </div>
  );
}

export default NoramalOption;
