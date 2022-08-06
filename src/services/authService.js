import axiosClient from "./axiosClient";

export async function loginUser({ email, password }) {
  return axiosClient({ requiresAuth: false }).post("/auth/login", {
    email: email,
    password: password,
  });
}

export async function registerUser({ name, email, password }) {
  return axiosClient({ requiresAuth: false }).post("/auth/register", {
    name: name,
    email: email,
    password: password,
  });
}

export async function updateUser({ name, email, password, id }) {
  return axiosClient({ requiresAuth: false }).patch(`/users/${id}`, {
    name: name,
    email: email,
    password: password,
    isSignupComplete: true,
  });
}

export async function getMe() {
  return axiosClient({ requiresAuth: false }).get("/auth/me");
}

export async function logout() {
  return axiosClient({ requiresAuth: false }).get("/auth/logout-session");
}
