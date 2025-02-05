import axios from "axios";
import { ENDPOINT } from "../constant/constant";

const userAuthURL = `${ENDPOINT}/api/v1/users`;
const apiClient = axios.create({ baseURL: userAuthURL });

export async function login(loginData) {
  const res = await apiClient.post("/login", { ...loginData }, { withCredentials: true });
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function signup(signupData) {
  const res = await apiClient.post("/signup", signupData, { withCredentials: true });
  const data = await res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function logout() {
  const res = await apiClient.get("/logout", { withCredentials: true });
  const data = await res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function changeUserPassword(passwordData) {
  const res = await apiClient.post("/change-password", passwordData, { withCredentials: true });
  const data = await res.data;

  if (res.status !== 200) console.error(data);
}
