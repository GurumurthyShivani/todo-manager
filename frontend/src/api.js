// Small wrapper around fetch for the REST API.
const BASE = import.meta.env.VITE_API_URL || "https://todo-manager-backend-d82p.onrender.com/api";

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || "Request failed");
    err.fields = data.errors || {};
    throw err;
  }
  return data;
}

export const api = {
  list: (status, search) =>
    request(`/tasks?status=${status}&search=${encodeURIComponent(search)}`),
  create: (task) => request("/tasks", { method: "POST", body: JSON.stringify(task) }),
  update: (id, task) => request(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(task) }),
  setStatus: (id, status) =>
    request(`/tasks/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  remove: (id) => request(`/tasks/${id}`, { method: "DELETE" }),
};
