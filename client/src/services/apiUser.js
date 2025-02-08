import axios from "axios";
import { ENDPOINT } from "../constant/constant";

const userApiClient = axios.create({ baseURL: `${ENDPOINT}/api/v1/users` });

export async function getAllUsers(queries) {
  let url = "";

  if (queries !== undefined) {
    const { isAdmin, maxUsers, username } = queries;

    if (isAdmin) url += `?admin=true`;
    if (maxUsers) url += `${isAdmin ? "&" : "?"}maxUsers=${maxUsers}`;
    if (username) url += `${isAdmin || maxUsers ? "&" : "?"}username=${username}`;
  }

  const res = await userApiClient.get(url, { withCredentials: true });
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function updateUserData({ data: userData }) {
  const formData = new FormData();

  if (userData.photo) formData.append("photo", userData.photo[0]);
  formData.append("username", userData.username);
  formData.append("email", userData.email);
  formData.append("telegram", userData.telegram);
  formData.append("discord", userData.discord);
  formData.append("reddit", userData.reddit);
  formData.append("twitter", userData.twitter);
  formData.append("instagram", userData.instagram);
  formData.append("linkedin", userData.linkedin);

  const res = await userApiClient.put("/update-me", formData, { withCredentials: true });
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function updateUserFriends(friendData) {
  const res = await userApiClient.patch("/update-user-friends", friendData, { withCredentials: true });
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function getUserQuiz(userId) {
  const res = await userApiClient.get(`${userId}/quizzes?user=true`, { withCredentials: true });
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function updateUserPassword(passwordData) {}

export async function deleteUser(userId) {
  const res = await userApiClient.delete(`${userId}`, { withCredentials: true });
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function userQuizResult(quizResult) {
  const res = await userApiClient.patch(`/user-quiz-result`, { quizResult }, { withCredentials: true });
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}
