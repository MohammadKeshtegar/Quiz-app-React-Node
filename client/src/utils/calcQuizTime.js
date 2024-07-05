export function calcQuizTime(questions) {
  const totalTime = questions.reduce((acc, curQuestion) => {
    if (curQuestion.difficulty === "easy") return acc + 10;
    if (curQuestion.difficulty === "medium") return acc + 15;
    if (curQuestion.difficulty === "hard") return acc + 20;
    return acc;
  }, 0);
  return totalTime;
}
