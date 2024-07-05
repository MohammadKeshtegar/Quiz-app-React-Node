const categoryURL = "/api/v1/category";

export async function getAllCategories() {
  const res = await fetch(`${categoryURL}`);
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function createCategory(categoryData) {
  const res = await fetch(`${categoryURL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoryData),
  });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function updateCategory({ categoryData, categoryId }) {
  const res = await fetch(`${categoryURL}/${categoryId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoryData),
  });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function deleteCategory(categoryId) {
  const res = await fetch(`${categoryURL}/${categoryId}`, { method: "DELETE" });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function deleteAllCategories() {
  const res = await fetch(`${categoryURL}`, { method: "DELETE" });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}
