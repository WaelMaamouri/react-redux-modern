const API_URL = "http://127.0.0.1:8000/api";

export async function getProducts() {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Impossible de récupérer les produits");
  }

  return response.json();
}

export default { getProducts };
