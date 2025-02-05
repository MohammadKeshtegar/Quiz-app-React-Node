import axios from "axios";
import { ENDPOINT } from "../constant/constant";

const apiClient = axios.create({ baseURL: `${ENDPOINT}/api/v1/category` });

export async function getAllCategories() {
  const res = await apiClient.get();
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function createCategory(categoryData) {
  const res = await apiClient.post("", { categoryData });
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function updateCategory({ categoryData, categoryId }) {
  const res = await apiClient.post(`${categoryId}`, { categoryData });
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function deleteCategory(categoryId) {
  const res = await apiClient.delete(`${categoryId}`);
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}

export async function deleteAllCategories() {
  const res = await apiClient.delete();
  const data = res.data;

  if (res.status !== 200) console.error(data);

  return data;
}
