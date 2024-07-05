const userURL = "/api/v1/users";

export async function getAllUsers(admin) {
  let res;

  if (admin) {
    res = await fetch(`${userURL}?admin=true`);
  } else {
    res = await fetch(`${userURL}`);
  }
  const data = await res.json();

  if (!res.ok) console.error(data);

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

  const res = await fetch(`${userURL}/update-me`, { method: "PUT", body: formData });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function getUserQuiz(userId) {
  const res = await fetch(`${userURL}/${userId}/quizzes`);
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function updateUserPassword(passwordData) {}

export async function deleteUser(userId) {
  const res = await fetch(`${userURL}/${userId}`, { method: "DELETE" });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function userQuizResult(quizResult) {
  const res = await fetch(`${userURL}/user-quiz-result`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quizResult),
  });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}
