const chatURL = "/api/v1/chat";

export async function getAllChats() {
  const res = await fetch(`${chatURL}`);
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function getChat(chatId) {
  const res = await fetch(`${chatURL}/${chatId}`);
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function createChatGroup(chatGroupData) {
  const res = await fetch(`${chatURL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(chatGroupData),
  });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}
