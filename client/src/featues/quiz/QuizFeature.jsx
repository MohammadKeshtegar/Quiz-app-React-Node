function QuizFeature({ feature, featureValue }) {
  return (
    <div className="rounded flex overflow-hidden">
      <span className="py-1 px-2 bg-neutral-600">{feature}</span> <span className="py-1 px-2 bg-blue-500"> {featureValue}</span>
    </div>
  );
}

export default QuizFeature;
