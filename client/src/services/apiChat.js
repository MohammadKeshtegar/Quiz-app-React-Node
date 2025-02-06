import axios from "axios";
import { ENDPOINT } from "../constant/constant";

const chatApiClient = axios.create({ baseURL: `${ENDPOINT}/api/v1/chat` });

export async function getAllChats(queries = {}) {
  let query = "";
  if (queries.chatName) {
    query += `?chatName=${queries.chatName}`;
  }

  console.log(query);
  const res = await chatApiClient.get(query, { withCredentials: true });
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function getChat(chatId) {
  const res = await chatApiClient.get(`/${chatId}`, { withCredentials: true });
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function getUserChats(userChatsId) {
  const res = await chatApiClient.post("/user-chats", { chatIDs: userChatsId }, { withCredentials: true });
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function createChatGroup(chatGroupData) {
  console.log(chatGroupData);
  const res = await chatApiClient.post("", chatGroupData, { withCredentials: true });
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}
