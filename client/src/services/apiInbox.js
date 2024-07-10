const inboxURL = "/api/v1/inbox";

export async function sendInbox(inboxData) {
  const res = await fetch(inboxURL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(inboxData) });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function cancelInbox(inboxId) {
  const res = await fetch(`${inboxURL}/${inboxId}`, { method: "DELETE" });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}
