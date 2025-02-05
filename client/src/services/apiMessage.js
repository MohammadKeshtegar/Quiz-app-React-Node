import axios from "axios";
import { ENDPOINT } from "../constant/constant";

const messagesApiClient = axios.create({ baseURL: `${ENDPOINT}/api/v1/messages` });

export async function getAllChatMessages(chatID) {
  let query = "";
  if (chatID) query = `?chat=${chatID}`;

  const res = await messagesApiClient.get(`${query}`, { withCredentials: true });
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function createMessage(message) {
  const res = await messagesApiClient.post("", { message }, { withCredentials: true });
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}
