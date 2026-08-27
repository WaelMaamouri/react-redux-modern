const API_URL = "http://127.0.0.1:8000/api";

export async function login(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Impossible de se connecter");
  }

  return data;
}

export async function register(name, email, password, confirmPassword) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, name, password, confirmPassword }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Impossible de s'inscrire");
  }

  return data;
}

export default {
  login,
  register,
};
