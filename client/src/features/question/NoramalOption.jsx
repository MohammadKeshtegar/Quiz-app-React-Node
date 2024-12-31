function NoramalOption({ correctAnswer, option, index }) {
  return (
    <div
      className={`${
        correctAnswer === index ? "bg-blue-600 text-white" : " dark:bg-neutral-800 bg-neutral-100"
      } dark:shadow-none shadow-custom-2 rounded p-2 text-lg`}
    >
      {option}
    </div>
  );
}

export default NoramalOption;
