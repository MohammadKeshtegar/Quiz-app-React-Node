import axios from "axios";
import { ENDPOINT } from "../constant/constant";

const questionsApiClient = axios.create({ baseURL: `${ENDPOINT}/api/v1/question` });

export async function getAllQuestions() {
  const res = await questionsApiClient.get();
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function getQuestion(id) {
  const res = await questionsApiClient.get(`/${id}`);
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function getQuizQuestions() {
  const res = await questionsApiClient.get("/quiz-questions");
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function createQuestion(questionData) {
  const res = await questionsApiClient.post("", { questionData }, { withCredentials: true });
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function updateQuestion({ questionData, id: questionId }) {
  const res = await questionsApiClient.put(`${questionId}`, { questionData }, { withCredentials: true });
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function deleteQuestion(questionId) {
  const res = await questionsApiClient.delete(`${questionId}`, {}, { withCredentials: true });
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}
