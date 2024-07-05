const questionURL = "/api/v1/question";

export async function getAllQuestions() {
  const res = await fetch(`${questionURL}`);
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function getQuestion(id) {
  const res = await fetch(`${questionURL}/${id}`);
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function getQuizQuestions() {
  const res = await fetch(`${questionURL}/quiz-questions`);
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function createQuestion(questionData) {
  const res = await fetch(`${questionURL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(questionData),
  });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function updateQuestion({ questionData, id: questionId }) {
  const res = await fetch(`${questionURL}/${questionId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(questionData),
  });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function deleteQuestion(questionId) {
  const res = await fetch(`${questionURL}/${questionId}`, { method: "DELETE" });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}
