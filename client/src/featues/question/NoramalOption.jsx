function NoramalOption({ correctAnswer, option, index }) {
  return <div className={`${correctAnswer === index ? "bg-blue-600" : " bg-neutral-800"} rounded p-2 text-lg`}>{option}</div>;
}

export default NoramalOption;
