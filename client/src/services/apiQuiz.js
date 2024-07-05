const quizURL = "/api/v1/quiz";

export async function getAllQuizzes(quizIdArray) {
  let res;
  if (quizIdArray) {
    res = await fetch(`${quizURL}?confirmed=true`);
  } else {
    res = await fetch(`${quizURL}`);
  }
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function getQuiz(quizId) {
  const res = await fetch(`${quizURL}/${quizId}`);
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function createQuiz({ questions, time, ...data }) {
  const res = await fetch(`${quizURL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questions, time, ...data }),
  });
  const jsonData = await res.json();

  if (!res.ok) console.error(jsonData);

  return jsonData;
}

export async function updateQuiz({ quizId, quizData }) {
  const res = await fetch(`${quizURL}/${quizId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quizData),
  });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function deleteQuiz(quizId) {
  const res = await fetch(`${quizURL}/${quizId}`, { method: "DELETE" });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}
