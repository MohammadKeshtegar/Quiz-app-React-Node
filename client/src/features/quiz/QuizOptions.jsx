function QuizOptions({ category, quizTime, questionNum }) {
  const options = [
    { text: "Category", value: category },
    { text: "Quiz time", value: quizTime },
    { text: "Number of Question", value: questionNum },
  ];

  return (
    <div className="flex items-center gap-4 justify-end">
      {options.map((option) => (
        <div key={option.text} className="rounded flex overflow-hidden">
          <span className="py-1 px-2 dark:bg-neutral-600 bg-neutral-200">{option.text}</span>{" "}
          <span className="py-1 px-2 bg-blue-500 text-white">{option.value}</span>
        </div>
      ))}
    </div>
  );
}

export default QuizOptions;
