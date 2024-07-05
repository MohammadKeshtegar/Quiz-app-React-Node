export function questionDifficulty(question) {
  if (question.difficulty === "hard") return 3;
  else if (question.difficulty === "medium") return 2;
  else if (question.difficulty === "easy") return 1;
}
