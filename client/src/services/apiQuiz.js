import axios from "axios";
import { ENDPOINT } from "../constant/constant";

const quizApiClient = axios.create({ baseURL: `${ENDPOINT}/api/v1/quiz` });

export async function getAllQuizzes(quizIdArray, filters) {
  let query = "";
  if (filters.owner || filters.category || filters.sort) {
    const { owner, category, sort } = filters;
    query += "?";
    if (owner) query += `owner=${owner}`;
    if (category) query += `${owner ? "&" : ""}category=${category}`;
    if (sort) query += `${owner || category ? "&" : ""}sort=${sort}`;
  }

  let whatQueryToSend = quizIdArray ? "?confirmed=true" : query;
  const res = await quizApiClient.get(whatQueryToSend, { withCredentials: true });
  const data = res.data;

  if (res.status !== 200) console.error(res);

  return data;
}

export async function getQuiz(quizId) {
  const res = await quizApiClient.get(`${quizId}`, { withCredentials: true });
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function createQuiz({ questions, time, ...restOfData }) {
  const res = await quizApiClient.post("", { questions, time, ...restOfData }, { withCredentials: true });
  const data = res.data;

  if (!res.ok) console.error(data);

  return data;
}

export async function updateQuiz({ quizId, quizData }) {
  const res = await quizApiClient.patch(`${quizId}`, { quizData }, { withCredentials: true });
  const data = res.data;

  if (!res.ok) console.error(data);

  return data;
}

export async function deleteQuiz(quizId) {
  const res = await quizApiClient.delete("", {}, { withCredentials: true });
  const data = res.data;

  if (!res.ok) console.error(data);

  return data;
}
