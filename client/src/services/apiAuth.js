const userAuthURL = "/api/v1/users";

export async function login(loginData) {
  const res = await fetch(`${userAuthURL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function signup(signupData) {
  const res = await fetch(`${userAuthURL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signupData),
  });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function logout() {
  const res = await fetch(`${userAuthURL}/logout`);
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function changeUserPassword(passwordData) {
  console.log(passwordData);
  const res = await fetch(`${userAuthURL}/change-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(passwordData),
  });
  const data = await res.json();

  console.log(data);
}

export async function forgotPassword({ email, port }) {
  const res = await fetch(`${userAuthURL}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, port }),
  });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function resetPassowrd({ token, ...passwordData }) {
  const res = await fetch(`${userAuthURL}/reset-password/${token.token}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...passwordData }),
  });

  console.log(token);
  console.log(passwordData);

  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}
