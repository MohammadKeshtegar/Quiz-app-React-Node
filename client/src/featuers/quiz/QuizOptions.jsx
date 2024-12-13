function QuizOptions({ category, quizTime, questionNum }) {
  return (
    <div className="flex items-center gap-4 justify-end">
      <div className="rounded flex overflow-hidden">
        <span className="py-1 px-2 bg-neutral-600">Category</span> <span className="py-1 px-2 bg-blue-500"> {category}</span>
      </div>
      <div className="rounded flex overflow-hidden">
        <span className="py-1 px-2 bg-neutral-600">Quiz time</span> <span className="py-1 px-2 bg-blue-500"> {quizTime}</span>
      </div>
      <div className="rounded flex overflow-hidden">
        <span className="py-1 px-2 bg-neutral-600">Number of Question</span> <span className="py-1 px-2 bg-blue-500"> {questionNum}</span>
      </div>
    </div>
  );
}

export default QuizOptions;
