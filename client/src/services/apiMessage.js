const messageURL = "/api/v1/messages";

export async function createMessage(message) {
  const res = await fetch(messageURL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(message) });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}
