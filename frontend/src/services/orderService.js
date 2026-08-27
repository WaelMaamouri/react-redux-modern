const API_URL = "http://127.0.0.1:8000/api";

export async function getOrders() {
  const response = await fetch(`${API_URL}/orders`);

  if (!response.ok) {
    throw new Error("Impossible de récupérer les commandes");
  }

  return response.json();
}

export default { getOrders };
