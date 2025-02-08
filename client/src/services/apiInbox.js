import axios from "axios";
import { ENDPOINT } from "../constant/constant";

const inboxApiClient = axios.create({ baseURL: `${ENDPOINT}/api/v1/inbox` });

export async function getAllInboxes() {
  const res = await inboxApiClient.get("", { withCredentials: true });
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function getInbox(inboxID) {
  const res = await inboxApiClient.get(`/${inboxID}`, { withCredentials: true });
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function createInbox(inboxData) {
  const res = await inboxApiClient.post("", inboxData, { withCredentials: true });
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function updateInbox({ inboxID, newData }) {
  const res = await inboxApiClient.patch(`${inboxID}`, newData, { withCredentials: true });
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function deleteInbox(inboxID) {
  const res = await inboxApiClient.delete(`${inboxID}`, { withCredentials: true });
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}
