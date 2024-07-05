function ConfirmQuizOption({ option, index, onClick, answer, correctAnswer }) {
  const thereIsAnswer = Boolean(answer);

  return (
    <div
      onClick={onClick}
      className={`rounded px-4 py-3 text-white capitalize font-semibold transition-all cursor-pointer w-full ${
        thereIsAnswer
          ? answer === index
            ? index === correctAnswer
              ? "bg-green-500 hover:bg-green-500"
              : "bg-red-500 hover:bg-red-400"
            : index === correctAnswer
            ? "bg-green-500 hover:bg-green-400"
            : "bg-blue-600 hover:bg-blue-500"
          : "bg-blue-600 hover:bg-blue-500"
      }`}
    >
      {index}. {option}
    </div>
  );
}

export default ConfirmQuizOption;
