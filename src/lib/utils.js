import { token } from "./token.js";

export const propComparator = (propName) => (a, b) =>
  a[propName].toLowerCase() === b[propName].toLowerCase()
    ? 0
    : a[propName].toLowerCase() < b[propName].toLowerCase()
    ? -1
    : 1;

export async function deleteUser(id) {
  const response = await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return response;
}

export async function fetchUsers() {
  const response = await fetch(`https://gorest.co.in/public/v2/users`).then(
    (response) => response.json()
  );
  return await response;
}

export async function addUser(user) {
  const response = await fetch(`https://gorest.co.in/public/v2/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(user),
  });
  return response;
}
