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

export async function updateChatGroup({ chatData, chatId }) {
  const formData = new FormData();
  formData.append("name", chatData.name);
  formData.append("members", JSON.stringify(chatData.users));
  if (chatData.picture) formData.append("picture", chatData.picture);

  const res = await fetch(`${chatURL}`, { method: "PATCH", body: formData });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}
