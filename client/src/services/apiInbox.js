const inboxURL = "/api/v1/inbox";

export async function getAllInboxes(user = false) {
  let res;
  if (user) {
    res = await fetch(`${inboxURL}?user=true`);
  } else {
    res = await fetch(inboxURL);
  }
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function sendInbox(inboxData) {
  const res = await fetch(inboxURL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(inboxData) });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function readInbox(inboxId) {
  const res = await fetch(`${inboxURL}/${inboxId}`, { method: "PATCH" });
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
