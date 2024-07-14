const chatURL = "/api/v1/chat";

export async function getAllChats() {
  const res = await fetch(`${chatURL}`);
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function getChat(chatId) {
  if (chatId) {
    const res = await fetch(`${chatURL}/${chatId}`);
    const data = await res.json();

    if (!res.ok) console.error(data);

    return data;
  } else {
    return null;
  }
}

export async function createChatGroup(chatGroupData) {
  const formData = new FormData();
  formData.append("name", chatGroupData.name);
  formData.append("members", JSON.stringify(chatGroupData.users));
  if (chatGroupData.picture) formData.append("picture", chatGroupData.picture);

  const res = await fetch(`${chatURL}`, { method: "POST", body: formData });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function updateChatGroup({ newData, chatId }) {
  const formData = new FormData();
  formData.append("name", newData.name);
  formData.append("members", JSON.stringify(newData.users));
  if (newData.picture) formData.append("picture", newData.picture);

  const res = await fetch(`${chatURL}/${chatId}`, { method: "PATCH", body: formData });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function joinChatGroup(chatId) {
  const res = await fetch(`${chatURL}/join-chat/${chatId}`, { method: "PATCH" });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function deleteChatGroup(chatId) {
  const res = await fetch(`${chatURL}/${chatId}`, { method: "DELETE" });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function removeChatMember({ chatId, userId }) {
  const res = await fetch(`${chatURL}/${chatId}/remove-member`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}
