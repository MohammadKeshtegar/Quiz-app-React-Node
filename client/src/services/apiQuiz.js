const quizURL = "/api/v1/quiz";

export async function getAllQuizzes(quizIdArray, filters) {
  let query = "";
  if (filters.owner || filters.category || filters.sort) {
    const { owner, category, sort } = filters;
    query += "?";
    if (owner) query += `owner=${owner}`;
    if (category) query += `${owner ? "&" : ""}category=${category}`;
    if (sort) query += `${owner || category ? "&" : ""}sort=${sort}`;
  }

  let res;
  if (quizIdArray) {
    res = await fetch(`${quizURL}?confirmed=true`);
  } else {
    res = await fetch(`${quizURL}${query}`);
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
